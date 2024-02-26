import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Scanner from "./Components/Scanner";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NoPage from './Components/Nopage';
import Home from './Components/Home';
import PatientDashboard from './Components/PatientDashboard'; // Adjust the path as necessary
import DoctorDashboard from './Components/DoctorDashboard'; // Adjust the path as necessary

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
