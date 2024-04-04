import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import DataContext from "./DataContext";

function DoctorDashboard() {
  const navigate = useNavigate();
  const { data } = useContext(DataContext);

  const handleViewPatientDetails = () => {
    navigate("/patient-details");
  };

  const handleAddNewPatient = () => {
    navigate("/add-patient");
  };

  const handleRecordAudio = () => {
    navigate("/record-audio");
  };

  const handleChatWithPatients = () => {
    navigate("/chat");
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <NavBar />
      <div className="container mx-auto py-8">
        <h1 className="text-center text-5xl font-bold mb-8">Doctor Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* View Patient Details */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer" onClick={handleViewPatientDetails}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Patient Details & History</h2>
              <p className="text-gray-300">View Medical records</p>
            </div>
          </div>

          {/* Add New Patient */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer" onClick={handleAddNewPatient}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Add New Patient Record</h2>
              <p className="text-gray-300">Enter details of new patients</p>
            </div>
          </div>

          {/* Record Audio */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer" onClick={handleRecordAudio}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Record Audio</h2>
              <p className="text-gray-300">Record audio from the stethoscope</p>
            </div>
          </div>
        </div>

        {/* Chat with Patients */}
        <button className="bg-blue-500 rounded-lg px-6 py-3 mt-8 transition duration-300 ease-in-out hover:bg-blue-600" onClick={handleChatWithPatients}>
          Chat with Patients
        </button>
      </div>
    </div>
  );
}

export default DoctorDashboard;
