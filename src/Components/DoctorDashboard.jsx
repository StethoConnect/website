import React, { useState, useContext } from "react";
import Scanner from "./Scanner"; // Adjust the path as necessary
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import DataContext from "./DataContext";

function DoctorDashboard() {
  const navigate = useNavigate();
  const { data } = useContext(DataContext);

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        <h2 className="bg-black text-center text-5xl text-white ">
          Doctor Dashboard
        </h2>
        {/* <h1 className="px-4 font-mono font-bold">{user.displayName}</h1> */}

        <ul>
          <li>
            <b> Name: </b>
            {data.user}
          </li>
          <li>
            <b> Token:</b>
            {data.secret}
          </li>
        </ul>

        {/* patient details  */}
        <div className="container mx-auto mt-8 flex  flex-col px-4">
          <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="px-6 py-4">
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                Patient Details
              </h2>
              <p className="mb-4 text-gray-700">
                View Previous/current patients details
              </p>
              <div className="flex justify-end">
                <button
                  className="mr-2 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                  onClick={() => navigate("/patient-details")}
                >
                  view
                </button>
              </div>
            </div>
          </div>

          {/* add new patients here  */}
          <div className="mx-auto mt-5 max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="px-6 py-4">
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                Add new Patient Record{" "}
              </h2>
              <p className="mb-4 text-gray-700">
                Enter details of new patients
              </p>
              <div className="flex justify-end">
                <button
                  className="mr-2 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                  onClick={() => navigate("/add-patient")}
                >
                  Add New
                </button>
              </div>
            </div>
          </div>

          {/* record audio through this  */}
          <div className="mx-auto mt-5 max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="px-6 py-4">
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                Record{" "}
              </h2>
              <p className="mb-4 text-gray-700">
                Record Audio from the stethoConnect steth
              </p>
              <div className="flex justify-end">
                <button
                  className="mr-2 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                  onClick={() => navigate("/record-audio")}
                >
                  Record
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="mr-2 rounded bg-black px-4 py-2 font-semibold text-white hover:bg-blue-700"
          onClick={() => navigate("/chat")}
        >
          Chat with Patients
        </button>
        {/* <Scanner /> */}
      </div>
    </>
  );
}

export default DoctorDashboard;
