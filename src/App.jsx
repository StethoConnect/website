import React, { useState } from "react";

function App() {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [connectedServer, setConnectedServer] = useState(null); // To store the connected server for disconnection

  const scanForDevices = async () => {
    try {
      console.log('Requesting Bluetooth Device...');
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true, // Modify here with filters if needed
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
      setConnectedServer(server); // Save the connected server for later disconnection
      console.log('Connected to ' + device.name);
    } catch (error) {
      console.log('Failed to connect: ' + error);
    }
  };

  const disconnectDevice = async (device) => {
    if (connectedServer && device === connectedDevice) {
      connectedServer.disconnect();
      console.log('Disconnected from ' + device.name);
      setConnectedDevice(null); // Reset the connected device state
      setConnectedServer(null); // Reset the connected server state
      // Optionally, remove the device from the devices list if needed
      setDevices(devices.filter(d => d.id !== device.id));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="display-4">Official StethoConnect Website</h1>
      <div className="row mt-4">
        <div className="col-md-6">
          <p>Welcome to the official website of StethoConnect! Our project is a cost-effective digital stethoscope built with the help of TinyML, cloud technology, and web technology.</p>
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
                  <button onClick={() => disconnectDevice(device)} className="btn btn-warning">Disconnect</button>
                ) : (
                  <button onClick={() => connectToDevice(device)} className="btn btn-success">Connect</button>
                )}
              </li>
            ))}
            {connectedDevice && (
              <li className="list-group-item">Connected to: {connectedDevice.name}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
