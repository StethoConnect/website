import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {useSelector} from "react-redux";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NoPage from './Components/NoPage';
import Home from './Components/Home';
import DoctorDashboard from './Components/DoctorDashboard'; // Adjust the path as necessary
import RecordAudio from "./Components/RecordAudio";
import AddPatient from "./Components/AddPatient";

function App() {
const user= useSelector((state) => state.data.user.user);

  return (

    <>
    {user ? (
      <DoctorDashboard />

    ):(
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
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="*" element={<NoPage />} />
          <Route path="record-audio" element={<RecordAudio />} />
        </Routes>
      </BrowserRouter>) 
    }
    
     
    </>
  );
}

export default App;
