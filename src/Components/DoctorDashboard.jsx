import React from "react";
import Scanner from "./Scanner"; // Adjust the path as necessary

function DoctorDashboard() {
  // Example data - replace with real data
  const patients = ["Patient A", "Patient B"];

  return (
    <div className="container mx-auto p-4">
      <h2>Doctor Dashboard</h2>
      <h3>My Patients</h3>
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>{patient}</li>
        ))}
      </ul>
      <Scanner />
    </div>
  );
}

export default DoctorDashboard;
