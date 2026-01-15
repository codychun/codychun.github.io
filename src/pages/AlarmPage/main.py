# This code is stored and ran from the Raspberryr Pi Pico 2W to interface with the website page

import bluetooth
from machine import Pin, RTC
import utime
from micropython import const
import struct

# Use Nordic UART Service UUID which is well supported
# RX = data received BY the peripheral (Pico) - so this needs WRITE permission
# TX = data transmitted FROM the peripheral (Pico) - so this needs READ/NOTIFY permission
_ALARM_SERVICE_UUID = bluetooth.UUID("6E400001-B5A3-F393-E0A9-E50E24DCCA9E")  # Nordic UART Service
_COMMAND_CHAR_UUID = bluetooth.UUID("6E400002-B5A3-F393-E0A9-E50E24DCCA9E")   # RX - Commands FROM web app
_ALARM_CHAR_UUID = bluetooth.UUID("6E400003-B5A3-F393-E0A9-E50E24DCCA9E")     # TX - Status TO web app

# Command codes
CMD_SET_ALARM = const(0x01)
CMD_ARM = const(0x02)
CMD_DISARM = const(0x03)
CMD_SNOOZE = const(0x04)
CMD_STOP = const(0x05)
CMD_TEST = const(0x06)
CMD_SET_TIME = const(0x07)  # New command to set RTC time

# Hardware setup
motor1a = Pin(16, Pin.OUT)
motor1b = Pin(17, Pin.OUT)
motor2a = Pin(18, Pin.OUT)
motor2b = Pin(19, Pin.OUT)
led = Pin("LED", Pin.OUT)
rtc = RTC()

# Test the motor immediately on startup
def test_hardware():
    print("Testing hardware...")
    print("LED test...")
    led.on()		# Blink LED once to indicate success
    utime.sleep(1)
    led.off()
    
    print("Motor test...")
    motor_on()
    utime.sleep(2)
    motor_off()
    print("Hardware test complete")

# Global state
alarm_hour = 8        # Default alarm time
alarm_minute = 30
alarm_armed = False
alarm_ringing = False
alarm_snoozed = False  # Track if alarm is in snooze mode
snooze_minutes = 5
last_printed_time = ""  # For debugging time checks
buzz_state = False  # Track current buzz state
buzz_count = 0  # Count buzzes in pattern
last_buzz_time = 0  # Track timing for buzz pattern
led_state = False  # Track LED flash state
last_led_time = 0  # Track LED timing
alarm_triggered_this_minute = False  # Prevent multiple triggers in same minute

# Debug logging to file
debug_log = []

def log(msg):
    """Log message to both console and memory"""
    print(msg)
    debug_log.append(msg)
    # Keep only last 50 messages to avoid memory issues
    if len(debug_log) > 50:
        debug_log.pop(0)

# BLE handles and connection
ble = None
alarm_handle = None
command_handle = None  # Removed time_handle
connection_handle = None

def motor_on():
    motor1a.high()
    motor1b.low()
    motor2a.high()
    motor2b.low()

def motor_off():
    motor1a.low()
    motor1b.low()
    motor2a.low()
    motor2b.low()

def update_buzz_pattern():
    """Update the buzz pattern when alarm is ringing"""
    global buzz_state, buzz_count, last_buzz_time
    
    if not alarm_ringing:
        return
    
    current_time = utime.ticks_ms()
    
    # Buzz pattern: 3 short buzzes (200ms on, 200ms off), then 1 second pause, repeat
    # Pattern: BUZZ-pause-BUZZ-pause-BUZZ-pause-LONG_PAUSE-repeat
    
    # Calculate time since last buzz change
    time_diff = utime.ticks_diff(current_time, last_buzz_time)
    
    if buzz_count < 6:  # 3 buzzes = 6 state changes (on, off, on, off, on, off)
        # Short buzz pattern
        if time_diff >= 750:  # 750ms intervals
            if buzz_state:
                motor_off()
                buzz_state = False
            else:
                motor_on()
                buzz_state = True
            buzz_count += 1
            last_buzz_time = current_time
    else:
        # Long pause after 3 buzzes
        if time_diff >= 1000:  # 1 second pause
            buzz_count = 0  # Reset pattern
            last_buzz_time = current_time
            motor_off()
            buzz_state = False

def get_datetime():
    datetime = rtc.datetime()
    return datetime[4], datetime[5]  # hours, minutes

def set_alarm_time(hour, minute):
    global alarm_hour, alarm_minute
    alarm_hour = hour
    alarm_minute = minute
    print(f"Alarm set to {hour:02d}:{minute:02d}")

def set_rtc_time(year, month, day, hour, minute, second=0):
    """Set the RTC time manually"""
    # weekday calculation (0 = Monday, 6 = Sunday)
    # Simple approximation - you can improve this
    weekday = 0  # Default to Monday
    rtc.datetime((year, month, day, weekday, hour, minute, second, 0))
    print(f"RTC set to: {year}-{month:02d}-{day:02d} {hour:02d}:{minute:02d}:{second:02d}")
    
    # Verify it was set correctly
    verify_datetime = rtc.datetime()
    print(f"RTC verify: {verify_datetime[0]}-{verify_datetime[1]:02d}-{verify_datetime[2]:02d} {verify_datetime[4]:02d}:{verify_datetime[5]:02d}:{verify_datetime[6]:02d}")

def sync_time_from_ble():
    """Request current time from web app - the app should send it"""
    print("Waiting for time sync from web app...")

def arm_alarm():
    global alarm_armed, last_led_time, alarm_triggered_this_minute
    alarm_armed = True
    last_led_time = utime.ticks_ms()  # Initialize LED timing
    alarm_triggered_this_minute = False  # Reset trigger flag
    print("Alarm ARMED")

def disarm_alarm():
    global alarm_armed, alarm_ringing, alarm_snoozed, alarm_triggered_this_minute
    alarm_armed = False
    alarm_ringing = False
    alarm_snoozed = False  # Reset snooze state when disarmed
    alarm_triggered_this_minute = False  # Reset trigger flag
    motor_off()
    led.off()
    print("Alarm DISARMED")

def snooze_alarm():
    global alarm_ringing, alarm_hour, alarm_minute, alarm_snoozed, buzz_count, buzz_state
    alarm_ringing = False
    motor_off()
    alarm_snoozed = True
    buzz_count = 0  # Reset buzz pattern
    buzz_state = False
    
    # Calculate snooze time (current time + snooze_minutes)
    hours, minutes = get_datetime()
    snooze_time = minutes + snooze_minutes
    
    # Handle hour rollover
    if snooze_time >= 60:
        alarm_hour = (hours + 1) % 24
        alarm_minute = snooze_time % 60
    else:
        alarm_hour = hours
        alarm_minute = snooze_time
    
    print(f"Alarm SNOOZED for {snooze_minutes} minutes - will ring at {alarm_hour:02d}:{alarm_minute:02d}")

def stop_alarm():
    global alarm_ringing, alarm_snoozed, buzz_count, buzz_state, alarm_triggered_this_minute
    alarm_ringing = False
    alarm_snoozed = False  # Reset snooze state when stopped
    alarm_triggered_this_minute = False  # Reset trigger flag
    buzz_count = 0  # Reset buzz pattern
    buzz_state = False
    motor_off()
    led.off()
    print("Alarm STOPPED")

def test_alarm():
    global alarm_ringing, buzz_count, last_buzz_time, alarm_triggered_this_minute
    alarm_ringing = True
    buzz_count = 0  # Reset buzz pattern
    last_buzz_time = utime.ticks_ms()  # Initialize buzz timing
    alarm_triggered_this_minute = True  # Mark as triggered to prevent real alarm
    led.on()		# Blink LED once to indicate success
    utime.sleep(1)
    led.off()
    print("TEST ALARM - Starting buzz pattern")

def check_alarm():
    global alarm_ringing, last_printed_time, buzz_count, last_buzz_time, alarm_triggered_this_minute
    
    # Always get current time
    hours, minutes = get_datetime()
    
    # Debug: print time check when minute changes
    current_time_key = f"{hours:02d}:{minutes:02d}"
    alarm_time_key = f"{alarm_hour:02d}:{alarm_minute:02d}"
    
    if current_time_key != last_printed_time:
        # Minute has changed - reset trigger flag
        alarm_triggered_this_minute = False
        last_printed_time = current_time_key
        
        print(f"=== TIME CHECK ===")
        print(f"Current: {current_time_key}")
        print(f"Target:  {alarm_time_key}")
        print(f"Armed: {alarm_armed}")
        print(f"Ringing: {alarm_ringing}")
        print(f"Match: {current_time_key == alarm_time_key}")
        print(f"==================")
        
        # Check if it's alarm time and not already triggered this minute
        if alarm_armed and current_time_key == alarm_time_key and not alarm_triggered_this_minute:
            print(f"*** ALARM TRIGGER CONDITIONS MET ***")
            print(f"Current: {current_time_key}, Alarm: {alarm_time_key}")
            alarm_ringing = True
            alarm_triggered_this_minute = True  # Mark as triggered
            buzz_count = 0  # Reset buzz pattern
            last_buzz_time = utime.ticks_ms()  # Initialize buzz timing
            led.on()		# Blink LED once to indicate success
            utime.sleep(1)
            led.off()
            print("ALARM TRIGGERED! Starting buzz pattern...")
            # Send status update if connected
            send_status_update()

def handle_ble_command(data):
    print(f"Processing BLE command: {list(data)}")
    
    if len(data) < 1:
        print("Empty command data")
        return
    
    command = data[0]
    print(f"Command code: {command}")
    
    if command == CMD_SET_ALARM and len(data) >= 3:
        hour, minute = data[1], data[2]
        print(f"Set alarm command: {hour:02d}:{minute:02d}")
        if 0 <= hour <= 23 and 0 <= minute <= 59:
            set_alarm_time(hour, minute)
        else:
            print(f"Invalid time: {hour}:{minute}")
    elif command == CMD_SET_TIME and len(data) >= 7:
        # Format: [CMD, year_low, year_high, month, day, hour, minute, second]
        year = data[1] | (data[2] << 8)  # Reconstruct year from 2 bytes
        month, day, hour, minute, second = data[3], data[4], data[5], data[6], data[7] if len(data) >= 8 else 0
        print(f"Set time command: {year}-{month:02d}-{day:02d} {hour:02d}:{minute:02d}:{second:02d}")
        if 2020 <= year <= 2100 and 1 <= month <= 12 and 1 <= day <= 31 and 0 <= hour <= 23 and 0 <= minute <= 59 and 0 <= second <= 59:
            set_rtc_time(year, month, day, hour, minute, second)
        else:
            print(f"Invalid datetime")
    elif command == CMD_ARM:
        print("Arm command received")
        arm_alarm()
    elif command == CMD_DISARM:
        print("Disarm command received")
        disarm_alarm()
    elif command == CMD_SNOOZE:
        print("Snooze command received")
        snooze_alarm()
    elif command == CMD_STOP:
        print("Stop command received")
        stop_alarm()
    elif command == CMD_TEST:
        print("Test command received")
        test_alarm()
    else:
        print(f"Unknown command: {command}")

def send_status_update():
    """Send current status to connected device"""
    global ble, connection_handle, alarm_handle
    if ble and connection_handle is not None and alarm_handle:
        try:
            # Pack status: [armed, ringing, hour, minute]
            status_data = bytes([
                1 if alarm_armed else 0,
                1 if alarm_ringing else 0,
                alarm_hour,
                alarm_minute
            ])
            ble.gatts_write(alarm_handle, status_data)
        except Exception as e:
            print(f"Failed to send status update: {e}")

def ble_irq(event, data):
    global connection_handle, ble
    
    # IRQ event constants for older MicroPython versions
    IRQ_CENTRAL_CONNECT = const(1)
    IRQ_CENTRAL_DISCONNECT = const(2)
    IRQ_GATTS_WRITE = const(3)
    IRQ_GATTS_READ_REQUEST = const(4)
    IRQ_SCAN_RESULT = const(5)
    IRQ_SCAN_DONE = const(6)
    IRQ_PERIPHERAL_CONNECT = const(7)
    IRQ_PERIPHERAL_DISCONNECT = const(8)
    IRQ_GATTC_SERVICE_RESULT = const(9)
    IRQ_GATTC_SERVICE_DONE = const(10)
    IRQ_GATTC_CHARACTERISTIC_RESULT = const(11)
    IRQ_GATTC_CHARACTERISTIC_DONE = const(12)
    IRQ_GATTC_DESCRIPTOR_RESULT = const(13)
    IRQ_GATTC_DESCRIPTOR_DONE = const(14)
    IRQ_GATTC_READ_RESULT = const(15)
    IRQ_GATTC_READ_DONE = const(16)
    IRQ_GATTC_WRITE_DONE = const(17)
    IRQ_GATTC_NOTIFY = const(18)
    IRQ_GATTC_INDICATE = const(19)
    IRQ_GATTS_INDICATE_DONE = const(20)
    IRQ_MTU_EXCHANGED = const(21)
    IRQ_L2CAP_ACCEPT = const(22)
    IRQ_L2CAP_CONNECT = const(23)
    IRQ_L2CAP_DISCONNECT = const(24)
    IRQ_L2CAP_RECV = const(25)
    IRQ_L2CAP_SEND_READY = const(26)
    IRQ_CONNECTION_UPDATE = const(27)
    IRQ_ENCRYPTION_UPDATE = const(28)
    IRQ_GET_SECRET = const(29)
    IRQ_SET_SECRET = const(30)
    
    if event == IRQ_CENTRAL_CONNECT:
        connection_handle, _, _ = data
        print("BLE Connected!")
        utime.sleep_ms(200)  # Give connection time to stabilize
        send_status_update()
        
    elif event == IRQ_CENTRAL_DISCONNECT:
        connection_handle, _, _ = data
        connection_handle = None
        print("BLE Disconnected")
        
    elif event == IRQ_GATTS_WRITE:
        conn_handle, value_handle = data
        print(f"BLE Write Event - Connection: {conn_handle}, Handle: {value_handle}")
        print(f"Expected command handle: {command_handle}")
        
        try:
            # Read the data that was written
            written_data = ble.gatts_read(value_handle)
            print(f"Raw BLE data received: {written_data}")
            print(f"Data as list: {list(written_data)}")
            
            if value_handle == command_handle:
                print("Command received on correct handle!")
                handle_ble_command(written_data)
                # Send status update after processing command
                utime.sleep_ms(100)  # Small delay
                send_status_update()
            else:
                print(f"Data received on different handle: {value_handle} (expected {command_handle})")
                
        except Exception as e:
            print(f"Error handling BLE write: {e}")
            import sys
            sys.print_exception(e)
    
    elif event == IRQ_MTU_EXCHANGED:
        print(f"MTU exchanged: {data}")
    
    elif event == IRQ_CONNECTION_UPDATE:
        print(f"Connection parameters updated: {data}")
    
    else:
        print(f"BLE IRQ event {event} with data: {data}")

def start_ble():
    global ble, alarm_handle, command_handle
    
    ble = bluetooth.BLE()
    ble.active(True)
    ble.irq(ble_irq)
    
    # Nordic UART Service characteristics with correct permissions
    # RX (0x02) = WRITE from central (web app writes commands here)
    # TX (0x03) = READ + NOTIFY to central (Pico sends status here)
    services = [
        (
            _ALARM_SERVICE_UUID,
            [
                (_COMMAND_CHAR_UUID, bluetooth.FLAG_WRITE),  # RX - receives commands
                (_ALARM_CHAR_UUID, bluetooth.FLAG_READ | bluetooth.FLAG_NOTIFY),  # TX - sends status
            ],
        ),
    ]
    
    # Register the services
    handles = ble.gatts_register_services(services)
    command_handle, alarm_handle = handles[0]  # Swapped order to match new characteristic order
    
    print(f"Service handles: command={command_handle}, alarm={alarm_handle}")
    
    # Test: Write some initial data to status characteristic
    try:
        initial_status = bytes([0, 0, alarm_hour, alarm_minute])  # [armed, ringing, hour, minute]
        ble.gatts_write(alarm_handle, initial_status)
        print("✓ Initial status written to alarm characteristic")
    except Exception as e:
        print(f"✗ Failed to write to alarm characteristic: {e}")
    
    # Create advertising data with the Nordic UART service UUID
    device_name = "Haptic Alarm"
    
    # Advertising data structure
    adv_data = bytearray()
    
    # Flags
    adv_data.extend(struct.pack("BBB", 2, 0x01, 0x06))
    
    # Complete local name
    name_bytes = device_name.encode('utf-8')
    adv_data.extend(struct.pack("BB", len(name_bytes) + 1, 0x09))
    adv_data.extend(name_bytes)
    
    print(f"Advertising as '{device_name}'")
    print(f"Service UUID: {_ALARM_SERVICE_UUID}")
    print(f"Advertising data: {list(adv_data)}")
    
    # Start advertising (100ms interval)
    ble.gap_advertise(100, adv_data)
    print("BLE advertising started")
    
    return ble

def main():
    print("Starting Pico BLE Alarm Clock...")
    
    # Test hardware first
    # test_hardware()
    
    print("Device will advertise as 'Haptic Alarm'")
    print("Ready for BLE connections...")
    print("Commands: Press Ctrl+C to exit")
    
    # Initialize BLE
    start_ble()
    
    last_status_time = 0
    
    # Print full RTC datetime at startup
    startup_datetime = rtc.datetime()
    print(f"=== STARTUP INFO ===")
    print(f"RTC DateTime: {startup_datetime[0]}-{startup_datetime[1]:02d}-{startup_datetime[2]:02d} {startup_datetime[4]:02d}:{startup_datetime[5]:02d}:{startup_datetime[6]:02d}")
    print(f"Current time: {startup_datetime[4]:02d}:{startup_datetime[5]:02d}")
    print(f"Default alarm: {alarm_hour:02d}:{alarm_minute:02d}")
    print("====================")
    print("Waiting for alarm to be set via BLE...")
    
    # Main loop
    loop_count = 0
    while True:
        try:
            check_alarm()
            update_buzz_pattern()  # Update buzz pattern every loop iteration
            
            # Print status every 600 iterations (30 seconds at 50ms per loop)
            if loop_count % 600 == 0:
                current_datetime = rtc.datetime()
                current_time_str = f"{current_datetime[4]:02d}:{current_datetime[5]:02d}"
                alarm_time_str = f"{alarm_hour:02d}:{alarm_minute:02d}"
                connection_status = "Connected" if connection_handle else "Waiting for connection"
                print(f"Status - {connection_status} | Time: {current_time_str} | Alarm: {alarm_time_str} | Armed: {alarm_armed}")
            
            # Send periodic status updates if connected
            current_time = utime.ticks_ms()
            if connection_handle is not None and utime.ticks_diff(current_time, last_status_time) > 5000:
                send_status_update()
                last_status_time = current_time
            
            loop_count += 1
            utime.sleep_ms(50)  # Shorter sleep for smoother buzz pattern (was 1 second)
            
        except KeyboardInterrupt:
            print("Shutting down...")
            motor_off()  # Make sure motor is off
            led.off()  # Make sure LED is off
            if ble:
                ble.gap_advertise(None)  # Stop advertising
                ble.active(False)
            break
        except Exception as e:
            print(f"Error in main loop: {e}")
            utime.sleep(1)

if __name__ == "__main__":
    main()