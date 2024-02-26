import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // State to track whether the login is for a patient or a health professional
  const [loginType, setLoginType] = useState('patient'); // 'patient' or 'healthProfessional'
  const navigate = useNavigate();

  // Function to switch login type
  const toggleLoginType = () => {
    setLoginType(loginType === 'patient' ? 'healthProfessional' : 'patient');
  };

  // Modify your form's submit handler to redirect based on loginType
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (loginType === 'patient') {
      navigate('/patient-dashboard');
    } else {
      navigate('/doctor-dashboard');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login Page</h2>

      {/* Toggle Button */}
      <button onClick={toggleLoginType} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Switch to {loginType === 'patient' ? 'Health Professional' : 'Patient'} Login
      </button>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-3'>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input id="email" placeholder='Email' type='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input id="password" type='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        
        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          Login as {loginType === 'patient' ? 'Patient' : 'Health Professional'}
        </button>
      </form>
    </div>
  );
}

export default Login;
