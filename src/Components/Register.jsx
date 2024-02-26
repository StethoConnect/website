import React from 'react';

function Register() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Register Page</h2>
      <form className='form space-y-3'>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input id="name" placeholder='Name' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input id="email" placeholder='Email' type='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input id="password" type='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        
        <div>
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">Age</label>
          <input id="age" placeholder='Age' type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        
        <div>
          <label htmlFor="healthProfessional" className="inline-flex items-center">
            <input id="healthProfessional" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"/>
            <span className="ml-2 text-sm text-gray-900">Are you a health professional?</span>
          </label>
        </div>
        
        <div>
          <label htmlFor="patient" className="inline-flex items-center">
            <input id="patient" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"/>
            <span className="ml-2 text-sm text-gray-900">Are you a patient?</span>
          </label>
        </div>
        
        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
      </form>
    </div>
  );
}

export default Register;
