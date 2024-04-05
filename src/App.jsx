import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NoPage from "./Components/NoPage";
import Home from "./Components/Home";
import DoctorDashboard from "./Components/DoctorDashboard"; // Adjust the path as necessary
import RecordAudio from "./Components/RecordAudio";
import AddPatient from "./Components/AddPatient";

// import AudioPlayer from "./Components/AudioPlayer";
import ProcessAudio from "./Components/ProcessAudio";
import GetPatient from "./Components/GetPatient";
import LiveAudio from "./Components/LiveAudio";
import { DataProvider } from "./Components/DataContext";
// import ChatPage from "./Components/ChatPage";
import PatientSignup from "./Components/PatientSignup";
// import PChat from "./Components/PChat";
import Plogin from "./Components/Plogin";

function App() {
  return (
    <DataProvider>
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="*" element={<NoPage />} />
            <Route path="record-audio" element={<RecordAudio />} />

            <Route path="process-audio" element={<ProcessAudio />} />

            {/* <Route path="audio" element={<AudioPlayer/>} /> */}
            <Route path="patient-details" element={<GetPatient />} />
            <Route path="live-stream" element={<LiveAudio />} />
            {/* <Route path="chat" element={<ChatPage />} /> */}
            {/* <Route path="patient-chat" element={<PChat />} /> */}
            <Route path="patient-login" element={<Plogin />} />
            <Route path="patient-signup" element={<PatientSignup />} />
          </Routes>
        </BrowserRouter>
      </>
    </DataProvider>
  );
}

export default App;
