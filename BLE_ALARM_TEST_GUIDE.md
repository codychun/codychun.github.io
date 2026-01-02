# BLE Alarm Communication Test Guide

## Setup Instructions

### 1. Upload Pico Code
1. Copy the updated `main.py` to your Pico
2. Make sure the Pico is connected and running
3. You should see output like:
   ```
   Starting Pico BLE Alarm Clock...
   Testing hardware...
   LED test...
   Motor test...
   Hardware test complete
   Device will advertise as 'Haptic Alarm'
   Ready for BLE connections...
   Current time: 08:00
   Waiting for alarm to be set via BLE...
   BLE advertising started
   ```

### 2. Test Web App Connection
1. Open your web app in Chrome
2. Navigate to the Alarm section
3. Click "CONNECT BLUETOOTH"
4. Select "Haptic Alarm" from the device list
5. Check the browser console (F12) for connection logs

## Expected Behavior

### Connection Process
- Web app should find "Haptic Alarm" device
- Connection should establish successfully
- Console should show:
  ```
  Device found: Haptic Alarm
  Connecting to GATT server...
  Service obtained: 0000180a-0000-1000-8000-00805f9b34fb
  Command characteristic found: 12345678-1234-1234-1234-123456789abe
  Status characteristic found: 12345678-1234-1234-1234-123456789abc
  Status notifications enabled
  Connected successfully!
  ```

### Command Testing
1. **Set Alarm Time**: Change the time input - should send command to Pico
2. **Arm/Disarm**: Click ARM button - should toggle alarm state
3. **Test Alarm**: Click TEST ALARM - should start/stop motor
4. **Status Updates**: Pico should send status updates every 5 seconds

### Debugging
If communication isn't working:

1. **Check Pico Console**: Look for command received messages
2. **Check Web Console**: Look for BLE command logs
3. **Verify UUIDs**: Make sure they match between web app and Pico
4. **Check BLE Permissions**: Ensure Chrome has Bluetooth permissions

## Troubleshooting

### Common Issues
1. **"Web Bluetooth not supported"**: Use Chrome or Edge
2. **"Device not found"**: Make sure Pico is advertising and nearby
3. **"Connection failed"**: Check if another device is connected
4. **"No status updates"**: Check if notifications are enabled

### Pico Debug Output
The Pico will print detailed logs:
- `BLE Connected!` when web app connects
- `Command received: [1, 8, 30]` when setting alarm to 8:30
- `Status update sent: armed=True, ringing=False, time=08:30` when sending updates

### Web App Debug Output
The web app will log:
- BLE connection steps
- Commands being sent
- Status updates received
- Any errors encountered

## Test Sequence
1. Connect to Pico
2. Set alarm time to 1 minute from current time
3. Arm the alarm
4. Wait for alarm to trigger (or use test button)
5. Try snooze and stop functions
6. Disconnect and reconnect to verify persistence
