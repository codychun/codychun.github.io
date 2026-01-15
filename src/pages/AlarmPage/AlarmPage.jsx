import React, { useState, useEffect } from "react";
import "./AlarmPage.css"

function AlarmPage() {
    const [alarm, setAlarm] = useState({
        time: '08:30',
        isArmed: false,
        isRinging: false
    });
    const [isConnected, setIsConnected] = useState(false);
    const [device, setDevice] = useState(null);
    const [characteristic, setCharacteristic] = useState(null);
    const [statusCharacteristic, setStatusCharacteristic] = useState(null);

    // BLE Service and Characteristic UUIDs - Nordic UART Service
    const ALARM_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
    const COMMAND_CHAR_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";  // RX - write commands here
    const ALARM_CHAR_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";    // TX - read status from here

    // Command codes - must match the Pico code
    const CMD_SET_ALARM = 0x01;
    const CMD_ARM = 0x02;
    const CMD_DISARM = 0x03;
    const CMD_SNOOZE = 0x04;
    const CMD_STOP = 0x05;
    const CMD_TEST = 0x06;
    const CMD_SET_TIME = 0x07;  // New command to sync time

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        console.log(`Time changed to: ${newTime}`);
        setAlarm(prev => ({ ...prev, time: newTime }));
        
        // Send time to Pico if connected
        if (characteristic) {
            const [hours, minutes] = newTime.split(':').map(Number);
            console.log(`Sending time to Pico: ${hours}:${minutes}`);
            sendCommand(CMD_SET_ALARM, [hours, minutes]);
        } else {
            console.log('Not connected - time change local only');
        }
    };

    const sendCommand = async (command, data = []) => {
        if (!characteristic) {
            console.log('No BLE characteristic available');
            return;
        }

        try {
            const commandData = new Uint8Array([command, ...data]);
            console.log('Sending BLE command:', {
                command: command,
                data: data,
                fullCommand: Array.from(commandData)
            });
            
            await characteristic.writeValue(commandData);
            console.log(`✓ Command sent successfully: ${command}, data: ${data}`);
        } catch (error) {
            console.error('Failed to send BLE command:', error);
            alert(`BLE command failed: ${error.message}`);
        }
    };

    const toggleArm = async () => {
        const newArmedState = !alarm.isArmed;
        setAlarm(prev => ({ ...prev, isArmed: newArmedState }));
        
        if (characteristic) {
            await sendCommand(newArmedState ? CMD_ARM : CMD_DISARM);
        }
    };

    const snooze = async () => {
        setAlarm(prev => ({ ...prev, isRinging: false }));
        if (characteristic) {
            await sendCommand(CMD_SNOOZE);
        }
    };

    const stop = async () => {
        setAlarm(prev => ({ ...prev, isRinging: false, isArmed: false }));
        if (characteristic) {
            await sendCommand(CMD_STOP);
        }
    };

    const testAlarm = async () => {
        console.log('Test alarm button clicked');
        
        // Don't test if real alarm is ringing
        if (alarm.isRinging && isConnected) {
            console.log('Real alarm is ringing - ignoring test button');
            return;
        }
        
        const newRingingState = !alarm.isRinging;
        setAlarm(prev => ({ ...prev, isRinging: newRingingState }));
        
        if (characteristic) {
            console.log('Sending TEST command via BLE...');
            await sendCommand(CMD_TEST);
            console.log('TEST command sent');
        } else {
            console.log('No BLE characteristic - local test only');
        }
    };

    const connectBluetooth = async () => {
        try {
            if (!navigator.bluetooth) {
                alert('Web Bluetooth is not supported in this browser. Please use Chrome or Edge.');
                return;
            }
            
            console.log('Requesting Bluetooth device...');
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ name: 'Haptic Alarm' }],
                optionalServices: [ALARM_SERVICE_UUID]
            });
            
            console.log('Device found:', device.name, device.id);
            
            console.log('Connecting to GATT server...');
            const server = await device.gatt.connect();
            setDevice(device);
            
            console.log('Getting service...');
            const service = await server.getPrimaryService(ALARM_SERVICE_UUID);
            console.log('Service obtained:', service.uuid);
            
            console.log('Getting characteristics...');
            const commandChar = await service.getCharacteristic(COMMAND_CHAR_UUID);
            const statusChar = await service.getCharacteristic(ALARM_CHAR_UUID);
            
            console.log('Command characteristic:', commandChar.uuid);
            console.log('Status characteristic:', statusChar.uuid);
            console.log('Command characteristic properties:', commandChar.properties);
            
            setCharacteristic(commandChar);
            setStatusCharacteristic(statusChar);
            
            // Set up notifications for status updates (optional)
            try {
                console.log('Attempting to start notifications...');
                await statusChar.startNotifications();
                statusChar.addEventListener('characteristicvaluechanged', handleStatusUpdate);
                console.log('✓ Status notifications enabled');
            } catch (error) {
                console.log('Status notifications not available (this is OK):', error.message);
            }
            
            console.log('Connected successfully! Sending time sync...');
            
            // Wait for React state to update and connection to stabilize
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Send current time to sync the Pico's RTC (including seconds for better accuracy)
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;  // JavaScript months are 0-indexed
            const day = now.getDate();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            
            console.log(`📅 Auto-syncing time: ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
            
            const timeData = [
                year & 0xFF,        // Year low byte
                (year >> 8) & 0xFF, // Year high byte
                month,
                day,
                hours,
                minutes,
                seconds             // Add seconds for better accuracy
            ];
            
            console.log(`Time command data:`, timeData);
            
            // Use commandChar directly instead of waiting for state update
            try {
                console.log('About to write time sync command...');
                const commandData = new Uint8Array([CMD_SET_TIME, ...timeData]);
                console.log('Command bytes to send:', Array.from(commandData));
                await commandChar.writeValue(commandData);
                console.log('✓ Time automatically synced - command sent');
            } catch (error) {
                console.error('❌ Failed to sync time:', error);
                alert('Failed to sync time: ' + error.message);
            }
            
            // Wait for time to sync
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Send initial alarm time (also use commandChar directly)
            const [alarmHours, alarmMinutes] = alarm.time.split(':').map(Number);
            console.log(`Setting initial alarm time: ${alarmHours}:${alarmMinutes}`);
            
            try {
                console.log('About to write alarm time command...');
                const alarmData = new Uint8Array([CMD_SET_ALARM, alarmHours, alarmMinutes]);
                console.log('Alarm command bytes to send:', Array.from(alarmData));
                await commandChar.writeValue(alarmData);    
                console.log('✓ Initial alarm time set - command sent');
            } catch (error) {
                console.error('❌ Failed to set alarm time:', error);
                alert('Failed to set alarm time: ' + error.message);
            }
            
            // Mark as connected
            setIsConnected(true);
            
            // Handle disconnection
            device.addEventListener('gattserverdisconnected', () => {
                console.log('Device disconnected');
                setIsConnected(false);
                setDevice(null);
                setCharacteristic(null);
                setStatusCharacteristic(null);
            });
            
        } catch (error) {
            console.error('Bluetooth connection failed:', error);
            alert(`Failed to connect: ${error.message}`);
        }
    };

    const handleStatusUpdate = (event) => {
        const data = new Uint8Array(event.target.value.buffer);
        if (data.length >= 4) {
            const [armed, ringing, hour, minute] = data;
            console.log('Status update:', { armed, ringing, hour, minute });
            
            setAlarm(prev => ({
                ...prev,
                isArmed: armed === 1,
                isRinging: ringing === 1,
                time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
            }));
        }
    };

    const disconnectBluetooth = () => {
        if (device && device.gatt.connected) {
            device.gatt.disconnect();
        }
    };

    // Check for alarm time (fallback for web-only mode)
    useEffect(() => {
        if (isConnected) return; // Skip local alarm check if connected to device
        
        const checkAlarm = () => {
            const now = new Date();
            const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                               now.getMinutes().toString().padStart(2, '0');
            
            if (alarm.isArmed && alarm.time === currentTime && !alarm.isRinging) {
                setAlarm(prev => ({ ...prev, isRinging: true }));
            }
        };

        const interval = setInterval(checkAlarm, 1000);
        return () => clearInterval(interval);
    }, [alarm.isArmed, alarm.time, alarm.isRinging, isConnected]);

    const getStatusText = () => {
        if (alarm.isRinging) return 'RINGING';
        if (alarm.isArmed) return isConnected ? 'ARMED & CONNECTED' : 'ARMED (LOCAL)';
        return isConnected ? 'CONNECTED' : 'DISCONNECTED';
    };

    const getStatusClass = () => {
        if (alarm.isRinging) return 'ringing';
        if (alarm.isArmed) return 'connected';
        return isConnected ? 'connected' : 'disconnected';
    };

    return (
        <section className="alarm-page">
            <h1 className="alarm-title">Haptic Alarm</h1>
        
            <div className={`status-indicator ${getStatusClass()}`}>
                {getStatusText()}
            </div>

            {!isConnected ? (
                <button 
                    className="alarm-button connect-button"
                    onClick={connectBluetooth}
                >
                    CONNECT BLUETOOTH
                </button>
            ) : (
                <button 
                    className="alarm-button disconnect-button"
                    onClick={disconnectBluetooth}
                >
                    DISCONNECT
                </button>
            )}
        
            <div className="time-section">
                <label className="time-label">Set Alarm Time</label>
                <input 
                    type="time" 
                    className="time-input"
                    value={alarm.time}
                    onChange={handleTimeChange}
                />
            </div>
        
            <button 
                className={`alarm-button ${alarm.isArmed ? 'armed-button' : 'arm-button'}`}
                onClick={toggleArm}
            >
                {alarm.isArmed ? 'DISARM' : 'ARM'}
            </button>
        
            <div className="status-display">
                Status: {alarm.isArmed ? 'ARMED' : 'DISABLED'} at {alarm.time}
            </div>
            
            {alarm.isRinging && (
                <div className="alarm-controls">
                    <button 
                        className="alarm-button control-button"
                        onClick={snooze}
                    >
                        SNOOZE
                    </button>
                    <button 
                        className="alarm-button control-button"
                        onClick={stop}
                    >
                        STOP
                    </button>
                </div>
            )}
            
            <button 
                className="alarm-button control-button"
                onClick={testAlarm}
            >
                {alarm.isRinging ? 'STOP TEST' : 'TEST ALARM'}
            </button>
            
            <div className="alarm-note">
                <strong>Note:</strong> Make sure your Pico is running the BLE alarm code and 
                advertising as "Haptic Alarm". The device must be nearby and discoverable.
                {isConnected && <><br/><strong>Connected to Haptic Alarm device!</strong></>}
            </div>
        </section>
    );
}

export default AlarmPage;