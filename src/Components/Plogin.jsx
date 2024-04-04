import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { flaskapi, ngrok } from '../../ngrok';
import DataContext from './DataContext';
import NavPrev from './NavPre';


const Plogin = () => {
    const navigate = useNavigate();

    const { data, setData } = useContext(DataContext);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [secretId, setSecretId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(ngrok+'/patient_login', {
                password,
                secret_id: secretId
            });

            // Handle successful response here
            console.log(response.data);

            // Update data in context with username and password
            setData({
                ...data,
                user: username,
                pswd: password,
            });

            if (response.status === 200){
                alert("Login Successful");
                navigate('/patient-chat');
            }

        } catch (error) {
            // Handle validation error here
            if (error.response && error.response.status === 422) {
                setErrorMessage(error.response.data.detail[0].msg);
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <> 
        <NavPrev />
        <div className="bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full mx-auto p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-white">Patient Login</h2>
                </div>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Secret ID"
                            value={secretId}
                            onChange={(e) => setSecretId(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                </form>
            </div>
        </div>
        </>
    );
};

export default Plogin;
