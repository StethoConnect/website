import React from 'react';
import { Link } from "react-router-dom";
 



function NavBar() {
  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/doctor-dashboard">Home</Link>
          </li>
          <li>
            <Link to="/Record-Audio">RecordAudio</Link>
          </li>
          <li>
            <Link to="/add-patient">Add patient</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default NavBar;
