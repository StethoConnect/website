import React, { useContext, useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ngrok } from "../../ngrok";

import DataContext from "./DataContext";

function Login() {
  const navigate = useNavigate();

  const { data, setData } = useContext(DataContext);
  //

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare the data to be sent in the request
    const loginData = { email, password };

    try {
      const response = await fetch(ngrok + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data1 = await response.json();
        setData({
          user: data1.token.displayName,
          idToken: data1.token.idToken,
        });

        console.log("login sucess:", data.user, data.idToken);
        // Redirect to doctor dashboard
        navigate("/doctor-dashboard");
      } else {
        // Handle errors, e.g., show a message to the user
        console.error("Login failed");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="mb-4 text-xl font-bold">Doctor Login</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
