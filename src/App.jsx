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
import MyComponent from "./Components/MyComponent";
import AudioPlayer from "./Components/AudioPlayer";
import ProcessAudio from "./Components/ProcessAudio";

function App() {
const user= useSelector((state) => state.data.user.user);

  return (

    <>
    {user ? (
      <DoctorDashboard />

    ):(
       <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="*" element={<NoPage />} />
          <Route path="record-audio" element={<RecordAudio />} />
          <Route path="my" element={<MyComponent />} />
          <Route path="process-audio" element={<ProcessAudio />} />

          <Route path="audio" element={<AudioPlayer/>} />
        </Routes>
      </BrowserRouter>) 
    }
    
     
    </>
  );
}

export default App;
