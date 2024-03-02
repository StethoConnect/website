import React, { useState } from "react";
import Scanner from "./Scanner"; // Adjust the path as necessary
import { useSelector } from "react-redux";

function DoctorDashboard() {
  // Example data - replace with real data
  const patients = ["Patient A", "Patient B"];
  const user = useSelector((state) => state.data.user.user);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [remark, setRemark] = useState();

  return (
    <div className="container mx-auto p-4">
      <h2>Doctor Dashboard</h2>
      <h1 className="px-4 font-mono font-bold">{user.displayName}</h1>

      <ul>
        <li>
          <b> Email </b>
          {user.email}
        </li>
        <li>
          <b> token:</b>
          {user.idtoken}
        </li>
      </ul>

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
