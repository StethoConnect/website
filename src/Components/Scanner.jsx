import React, { useState } from "react";

function Scanner() {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [connectedServer, setConnectedServer] = useState(null);

  const scanForDevices = async () => {
    try {
      console.log('Requesting Bluetooth Device...');
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });

      console.log('> Found ' + device.name);
      setDevices(prevDevices => [...prevDevices, device]);
    } catch (error) {
      console.log('Argh! ' + error);
    }
  };

  const connectToDevice = async (device) => {
    try {
      console.log('Connecting to GATT Server...');
      const server = await device.gatt.connect();
      setConnectedDevice(device);
      setConnectedServer(server);
      console.log('Connected to ' + device.name);
    } catch (error) {
      console.log('Failed to connect: ' + error);
    }
  };

  const disconnectDevice = async (device) => {
    if (connectedServer && device === connectedDevice) {
      connectedServer.disconnect();
      console.log('Disconnected from ' + device.name);
      setConnectedDevice(null);
      setConnectedServer(null);
      setDevices(devices.filter(d => d.id !== device.id));
    }
  };

  return (
    <ul className="list-group">
      <li className="list-group-item">
        👨🏻‍💻 Checkout Github <a href="https://github.com/StethoConnect/website.git">here</a>
      </li>
      <li className="list-group-item">
        <button onClick={scanForDevices} className="btn btn-primary">Scan for BLE Devices</button>
      </li>
      {devices.map((device, index) => (
        <li key={index} className="list-group-item">
          {device.name || 'Unknown Device'} - 
          {connectedDevice && connectedDevice.id === device.id ? (
            <button onClick={() => disconnectDevice(device)} class="bg-blue-500 text-white font-bold py-2 px-4 rounded">Disconnect</button>
          ) : (
            <button onClick={() => connectToDevice(device)} className="btn btn-success">Connect</button>
          )}
        </li>
      ))}
      {connectedDevice && (
        <li className="list-group-item">Connected to: {connectedDevice.name}</li>
      )}
    </ul>
  );
}

export default Scanner;
