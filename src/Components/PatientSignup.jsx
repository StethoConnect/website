import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { flaskapi, ngrok } from '../../ngrok';
import NavPrev from './NavPre';

const PatientSignup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secretId, setSecretId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post(ngrok + '/patient_signup/', {
                password,
                secret_id: secretId
            });

            // Handle successful response here
            console.log(response.data);
            if (response.status === 200 ){
                const chatres = await axios.post(flaskapi + '/signup', {
                    name,
                    password,
                    email: userEmail,
                    firstName: name,
                });
                if(chatres.status === 200){
                    console.log(chatres.data);
                }else{
                    throw new Error('Chatbot signup failed');
                }
                alert("Account created successfully! Please log in to continue.");
            }

            // Redirect to patient login page after signup
            navigate('/patient-login');
        } catch (error) {
            // Handle validation error here
            if (error.response && error.response.status === 422) {
                setErrorMessage(error.response.data.detail[0].msg);
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (<> 
    <NavPrev/>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
            
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Patient Signup</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="userEmail"
                                name="userEmail"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="secretId"
                                name="secretId"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Secret ID"
                                value={secretId}
                                onChange={(e) => setSecretId(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {/* <!-- Heroicon name: lock-closed --> */}
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M3 7a7 7 0 1114 0H3zm14 2a9 9 0 00-9-9v2a7 7 0 019 7v-2z" />
                                </svg>
                            </span>
                            Signup
                        </button>
                    </div>
                </form>
                {errorMessage && <p className="error-message text-red-500 text-center">{errorMessage}</p>}
            </div>
        </div>
        </>
    );
};

export default PatientSignup;
