import React from "react";
// import Scanner from "./Scanner";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <>
     <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
           
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
        
      <div className="container mt-5">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">StethoConnect</h1>
        <div className="row mt-4">
          <div className="col-md-6">
            <p>Welcome to the official website of StethoConnect! Our project is a cost-effective digital stethoscope built with the help of TinyML, cloud technology, and web technology.</p>
            {/* <Scanner /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
