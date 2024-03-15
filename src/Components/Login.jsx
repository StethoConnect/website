import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, setLoading } from '../features/userSlice';
import { ngrok } from '../../ngrok';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";



function Login() {



  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare the data to be sent in the request
    const loginData = { email, password };

    try {
      const response = await fetch(ngrok + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420",

        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("login sucess:",data);
    
//updating response data 
        dispatch(
          loginUser(
            {
              idtoken: data.token.idToken,
              username:data.token.displayName,
              email: data.token.email,

            }
          )
        );
      
        // Redirect to doctor dashboard
        navigate('/doctor-dashboard');
      } else {
        // Handle errors, e.g., show a message to the user
        console.error('Login failed');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <> 
        <nav className="bg-gray-800 text-white p-4">
    <ul className="flex space-x-4">
     
      <li><Link to="/">Home</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </nav>
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Doctor Login</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-3'>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        
        <div>
          <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input id="password" autoComplete='on' value={password} onChange={(e) => setPassword(e.target.value)} type='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        
        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          Login
        </button>
      </form>
    </div>
    </>

  );
}

export default Login;
