// import React, { useState ,useContext} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ngrok } from '../../ngrok';  
// import NavBar from './NavBar';
// import DataContext from './DataContext';


// function AddPatient() {
//   const navigate = useNavigate()
//   const {data} = useContext(DataContext)
//   const [status, setStatus] = useState(false);
//   const [patientInfo, setPatientInfo] = useState({
//     name: "",
//     age: 0,
//     email: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPatientInfo(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch(ngrok +'/add_patient', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "ngrok-skip-browser-warning": "69420",
//         "id-token": data.idToken,
//       },
//       body: JSON.stringify(patientInfo),
//     });

//     if (response.ok) {
//       console.log("Patient added successfully.");
//       setStatus(true);
//       setTimeout(function(){
//         location.reload();
//     }, 2000); 
      
      
//     } else {
//       console.error("Failed to add patient.");
//     }
//   };

//   return (
//     <> 
//       {/* Uncomment the line below if NavBar is essential */}
//       <NavBar />
//       {status === false ? (
//         <div className="p-4 space-y-4 flex flex-col justify-center items-center">
//           <h2 className="text-2xl font-bold">Add Patient Details</h2>
//           <form onSubmit={handleSubmit}>
//             <div className=" mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="flex flex-col">
//                 <label htmlFor="name" className="text-sm font-semibold">Name</label>
//                 <input type="text" id="name" name="name" value={patientInfo.name} onChange={handleChange} className="border border-gray-300 rounded p-2 mt-1" required />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="age" className="text-sm font-semibold">Age</label>
//                 <input type="number" id="age" name="age" value={patientInfo.age} onChange={handleChange} className="border border-gray-300 rounded p-2 mt-1" required />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="email" className="text-sm font-semibold">E-Mail</label>
//                 <input type="text" id="email" name="email" value={patientInfo.email} onChange={handleChange} className="border border-gray-300 rounded p-2 mt-1" required />
//               </div>
//             </div>
//             <div className='flex justify-center mt-5'>  
//               <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">Add Patient</button>
//             </div>
//           </form>
//         </div>
//       ) : (
// <div className="container">
// <h1 className="text-2xl text-center">Patient added</h1>
//         {/* <button type = "button" className='border-t-neutral-500 bg-slate-300 rounded-md m-12' onClick={()=>location.reload()}>Add new patient</button> */}
// </div>
//       )}
//     </>
//   );
// }

// export default AddPatient;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ngrok } from '../../ngrok';  
import NavBar from './NavBar';
import DataContext from './DataContext';

function AddPatient() {
  const navigate = useNavigate();
  const { data } = useContext(DataContext);
  const [status, setStatus] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: 0,
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(ngrok + '/add_patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420",
          "id-token": data.idToken,
        },
        body: JSON.stringify(patientInfo),
      });

      if (response.ok) {
        console.log("Patient added successfully.");
        setStatus(true);
        setTimeout(() => {
          navigate("/doctor-dashboard");
        }, 2000); 
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Error adding patient:", error);
      alert(error.message);
    }
  };

  return (
    <> 
      <NavBar />
      {!status ? (
        <div className="bg-gray-900 min-h-screen text-white flex justify-center items-center">
          <div className="container mx-96 p-4">
            <h2 className="text-2xl font-bold mb-4">Add Patient Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-semibold">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={patientInfo.name} 
                  onChange={handleChange} 
                  className="border border-gray-300 rounded p-2 mt-1 w-48" 
                  required 
                />
              </div>
              {/* Age Input */}
              <div className="flex flex-col">
                <label htmlFor="age" className="text-sm font-semibold">Age</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  value={patientInfo.age} 
                  onChange={handleChange} 
                  className="border border-gray-300 rounded p-2 mt-1 w-48" 
                  required 
                />
              </div>
              {/* Email Input */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-semibold">E-Mail</label>
                <input 
                  type="text" 
                  id="email" 
                  name="email" 
                  value={patientInfo.email} 
                  onChange={handleChange} 
                  className="border border-gray-300 rounded p-2 mt-1 w-48" 
                  required 
                />
              </div>
              {/* Submit Button */}
              <div className="flex">  
                <button 
                  type="submit" 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 min-h-screen text-white flex justify-center items-center">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl text-center">Patient added</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default AddPatient;
