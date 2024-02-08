import React, { useState } from "react";

function App() {
  // Updated state to hold an array of devices
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  const scanForDevices = async () => {
    try {
      console.log('Requesting Bluetooth Device...');
      // Instead of connecting immediately, we'll just scan and display devices
      const device = await navigator.bluetooth.requestDevice({
        // Uncomment and replace with your service UUID to filter
        // filters: [{ services: ['your_service_uuid_here'] }],
        acceptAllDevices: true,
      });

      console.log('> Found ' + device.name);
      // Update the devices array with the new device, ensuring no duplicates
      setDevices(prevDevices => {
        const deviceExists = prevDevices.some(d => d.id === device.id);
        return deviceExists ? prevDevices : [...prevDevices, device];
      });

    } catch (error) {
      console.log('Argh! ' + error);
    }
  };

  const connectToDevice = async (device) => {
    try {
      console.log('Connecting to GATT Server...');
      const server = await device.gatt.connect();
      setConnectedDevice(device.name);
      console.log('Connected to ' + device.name);
    } catch (error) {
      console.log('Failed to connect: ' + error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="display-4">Official StethoConnect Website</h1>

      <div className="row mt-4">
        <div className="col-md-6">
          <p>
            Welcome to the official website of StethoConnect! Our project is a cost-effective digital stethoscope built with the help of TinyML, cloud technology, and web technology.
          </p>

          <ul className="list-group">
            <li className="list-group-item">
              👨🏻‍💻 Checkout Github{' '}
              <a href="https://github.com/StethoConnect/website.git">here</a>
            </li>
            <li className="list-group-item">
              <button onClick={scanForDevices} className="btn btn-primary">
                Scan for BLE Devices
              </button>
            </li>
            {/* List available devices */}
            {devices.map((device, index) => (
              <li key={index} className="list-group-item">
                {device.name || 'Unknown Device'} - <button onClick={() => connectToDevice(device)} className="btn btn-success">Connect</button>
              </li>
            ))}
            {/* Display connected device */}
            {connectedDevice && (
              <li className="list-group-item">
                Connected to: {connectedDevice}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
