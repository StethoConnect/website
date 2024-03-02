import React, { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationData = { email,name, password };

    try {
      const response = await fetch('http://127.0.0.1:8000/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Register Page</h2>
      <form onSubmit={handleSubmit} className='form space-y-3'>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input 
            id="email" 
            type='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email' 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required 
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input 
            id="name" 
            type='name' 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder='Name' 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required 
          />
        </div>

        
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input 
            id="password" 
            type='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required 
          />
        </div>
        
        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
      </form>
    </div>
  );
}

export default Register;
