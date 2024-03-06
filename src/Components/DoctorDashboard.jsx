import React, { useState } from "react";
import Scanner from "./Scanner"; // Adjust the path as necessary
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


function DoctorDashboard() {

  const navigate = useNavigate();

  // const user = useSelector((state) => state.data.user.user);


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-5xl text-center bg-black text-white ">Doctor Dashboard</h2>
      {/* <h1 className="px-4 font-mono font-bold">{user.displayName}</h1> */}

      <ul>
        <li>
          <b> Email: </b>
          {/* {user.email} */}
        </li>
        <li>
          <b> Name:</b>
          {/* {user.idtoken} */}
        </li>
      </ul>

{/* patient details  */}
      <div class="container flex mx-auto  px-4 mt-8">
    <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Patient Details</h2>
        <p class="text-gray-700 mb-4">View Previous/current patients details</p>
        <div class="flex justify-end">
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2">view</button>
        </div>
      </div>
    </div>




{/* add new patients here  */}
    <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg mt-5">
      <div class="px-6 py-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Add new Patient Record </h2>
        <p class="text-gray-700 mb-4">Enter details of new patients</p>
        <div class="flex justify-end">
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2">Add New</button>
        </div>
      </div>
    </div>



{/* record audio through this  */}
    <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg mt-5">
      <div class="px-6 py-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Record </h2>
        <p class="text-gray-700 mb-4">Record Audio from the stethoConnect steth</p>
        <div class="flex justify-end">
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"  onClick={()=>navigate('/Record-Audio') }>Record</button>
        </div>
      </div>
    </div>

  </div>

  

     
      <Scanner />
    </div>
  );
}

export default DoctorDashboard;
