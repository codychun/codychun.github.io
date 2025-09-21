import React, { useState, useEffect } from "react";
import "./Alarm.css";

function Alarm() {
    const [alarm, setAlarm] = useState({
        time: '07:00',
        isArmed: false,
        isRinging: false
    });
    const [isConnected, setIsConnected] = useState(false);

    const handleTimeChange = (e) => {
        setAlarm(prev => ({ ...prev, time: e.target.value }));
    };

    const toggleArm = () => {
        setAlarm(prev => ({ ...prev, isArmed: !prev.isArmed }));
    };

    const snooze = () => {
        setAlarm(prev => ({ ...prev, isRinging: false }));
    };

    const stop = () => {
        setAlarm(prev => ({ ...prev, isRinging: false, isArmed: false }));
    };

    const testAlarm = () => {
        setAlarm(prev => ({ ...prev, isRinging: !prev.isRinging }));
    };

    const connectBluetooth = async () => {
        try {
            if (!navigator.bluetooth) {
                alert('Web Bluetooth is not supported in this browser. Please use Chrome or Edge.');
                return;
            }
            
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ name: 'Haptic Alarm' }],
                optionalServices: ['0000180a-0000-1000-8000-00805f9b34fb']
            });
            
            const server = await device.gatt.connect();
            setIsConnected(true);
            
            // Add your BLE communication logic here
            // You'll need to implement the specific characteristics for your Pico
            
        } catch (error) {
            console.error('Bluetooth connection failed:', error);
            alert('Failed to connect to Bluetooth device. Make sure your alarm device is nearby and discoverable.');
        }
    };

    // Check for alarm time
    useEffect(() => {
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
    }, [alarm.isArmed, alarm.time, alarm.isRinging]);

    const getStatusText = () => {
        if (alarm.isRinging) return 'RINGING';
        if (alarm.isArmed) return 'CONNECTED';
        return 'DISCONNECTED';
    };

    const getStatusClass = () => {
        if (alarm.isRinging) return 'disconnected';
        if (alarm.isArmed) return 'connected';
        return 'disconnected';
    };

    const getArmButtonText = () => {
        return alarm.isArmed ? 'DISARM' : 'ARM';
    };

    const getArmButtonClass = () => {
        return `arm-button ${alarm.isArmed ? 'armed' : 'disarmed'}`;
    };

    const getStatusDisplayText = () => {
        return `Status: ${alarm.isArmed ? 'ARMED' : 'DISABLED'} at ${alarm.time}`;
    };

    const getStatusDisplayClass = () => {
        return `status-display ${alarm.isRinging ? 'ringing' : ''}`;
    };

    const getTestButtonText = () => {
        return alarm.isRinging ? 'STOP TEST' : 'TEST ALARM';
    };

    return (
        <section id="alarm" className="alarm">
            <h1 className="title">Haptic Alarm</h1>
        
            <div className={`status-indicator ${getStatusClass()}`}>
                {getStatusText()}
            </div>

            {!isConnected && (
                <button 
                    className="control-button" 
                    style={{background: '#2196F3', color: 'white', marginBottom: '20px'}}
                    onClick={connectBluetooth}
                >
                    CONNECT BLUETOOTH
                </button>
            )}
        
            <div className="time-section">
                <div className="time-label">Set Alarm Time</div>
                <input 
                    type="time" 
                    className="time-input" 
                    value={alarm.time}
                    onChange={handleTimeChange}
                />
            </div>
        
            <button className={getArmButtonClass()} onClick={toggleArm}>
                {getArmButtonText()}
            </button>
        
            <div className={getStatusDisplayClass()}>
                {getStatusDisplayText()}
            </div>
            
            {alarm.isRinging && (
                <div className="controls">
                    <button className="control-button snooze-button" onClick={snooze}>
                        SNOOZE
                    </button>
                    <button className="control-button stop-button" onClick={stop}>
                        STOP
                    </button>
                </div>
            )}
            
            <button className="control-button test-button" onClick={testAlarm}>
                {getTestButtonText()}
            </button>
            
            <div className="note">
                <strong>Note:</strong> This is a web version of the haptic alarm app. 
                For full functionality with Bluetooth connectivity, use the mobile app.
            </div>
        </section>
    );
}

export default Alarm;