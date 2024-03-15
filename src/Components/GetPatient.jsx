import React, { useState, useEffect } from "react";
import { ngrok } from "../../ngrok";
import  Navbar from "./NavBar";

const GetPatient = () => {
  const [patientDetails, setPatientDetails] = useState({});

  useEffect(() => {
    // Fetch patient details when the component mounts
    fetchPatientDetails();
  }, [patientDetails]);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(ngrok + "/get_all_patients", {
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420",
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        // Set patient details to the data inside all_patients
        setPatientDetails(data.all_patients);
      } else {
        console.error("Failed to fetch patient details");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  return (
    <div>
      <Navbar />
      {/* Your UI components */}

<h1>Get Patient Details</h1>
<div className="container p-10 m-10 bg-slate-400 "> 
      <table className="table-header-group px-4 py-5 m-8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(patientDetails).map(([id, patient]) => (
            <tr key={id}>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default GetPatient;
