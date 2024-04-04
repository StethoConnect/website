import React from "react";
import { Link } from "react-router-dom";

function NavPrev() {
  return (
    <>
      <nav className="bg-gray-800 p-4 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/patient-signup">Patient Register</Link>
          </li>
          <li>
            <Link to="/patient-login">patient Login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavPrev;
