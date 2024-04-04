// import React, { useState, useEffect } from "react";
// import { ngrok } from "../../ngrok";
// import  Navbar from "./NavBar";
// import DataContext from "./DataContext";
// import { useContext } from "react";



// const GetPatient = () => {
//   const [patientDetails, setPatientDetails] = useState({});


//   const {data} = useContext(DataContext)

//   useEffect(() => {
//     // Fetch patient details when the component mounts
//     fetchPatientDetails();
//   }, [patientDetails]);

//   const fetchPatientDetails = async () => {
//     try {
//       const response = await fetch(ngrok + "/get_all_patients", {
//         headers: {
//           'Content-Type': 'application/json',
//           "ngrok-skip-browser-warning": "69420",
//           "id-token": data.idToken,
//         }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data)
//         // Set patient details to the data inside all_patients
//         setPatientDetails(data.all_patients);
//       } else {
//         console.error("Failed to fetch patient details");
//       }
//     } catch (error) {
//       console.error("Error fetching patient details:", error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       {/* Your UI components */}

// <h1>Get Patient Details</h1>
// <div className="container p-10 m-10 bg-slate-400 "> 
//       <table className="table-header-group px-4 py-5 m-8">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Age</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(patientDetails).map(([id, patient]) => (
//             <tr key={id}>
//               <td>{patient.name}</td>
//               <td>{patient.email}</td>
//               <td>{patient.age}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       </div>
//     </div>
//   );
// };

// export default GetPatient;


import React, { useState, useEffect } from "react";
import { ngrok } from "../../ngrok";
import Navbar from "./NavBar";
import DataContext from "./DataContext";
import { useContext } from "react";

const GetPatient = () => {
  const { data } = useContext(DataContext);
  const [patientDetails, setPatientDetails] = useState({});
  const [expandedPatientId, setExpandedPatientId] = useState("");
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    // Fetch patient details when the component mounts
    fetchPatientDetails();
    // Fetch patient details every 3 minutes
    const intervalId = setInterval(fetchPatientDetails, 3 * 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(ngrok + "/get_all_patients", {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          "id-token": data.idToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Set patient details to the data inside all_patients
        setPatientDetails(data.all_patients);
      } else {
        console.error("Failed to fetch patient details");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const toggleExpand = (patientId) => {
    setExpandedPatientId(
      expandedPatientId === patientId ? "" : patientId
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const expandImage = (imageSrc) => {
    setExpandedImage(imageSrc);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  const downloadImage = (imageUrl) => {
    // Create an anchor element to trigger the download
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "patient_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Patient History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(patientDetails).map(([id, patient]) => (
            <div
              key={id}
              className={`bg-gray-800 rounded-lg p-4 transition duration-300 ease-in-out ${
                expandedPatientId === id ? "h-auto" : "h-32"
              }`}
              onClick={() => toggleExpand(id)}
            >
              <div className="flex justify-between">
                <div className="text-xl m-5 font-semibold mb-2">{patient.name}</div>
                <div className="text-xl mb-2">{patient.timestamp}</div>
              </div>
              {expandedPatientId === id && (
                <div>
                  <div className="text-sm mb-2">
                    <span className="font-semibold">ID:</span>{" "}
                    <span
                      className="cursor-pointer text-blue-500 hover:underline"
                      onClick={() => copyToClipboard(id)}
                    >
                      {id} (Click to copy)
                    </span>
                  </div>
                  <div className="text-sm mb-2">
                    <span className="font-semibold">Age:</span> {patient.age}
                  </div>
                  <div className="text-sm mb-2">
                    <span className="font-semibold">Email:</span> {patient.email}
                  </div>
                  <div className="text-sm mb-2">
                    <span className="font-semibold">Heart Label:</span>{" "}
                    {patient.predicted_heart_class}
                  </div>
                  <div className="text-sm mb-2">
                    <span className="font-semibold">Lung Label:</span>{" "}
                    {patient.predicted_lung_class}
                  </div>
                  <div className="flex mb-2">
                    <div className="mr-2">
                      <span className="font-semibold">Heart Audio Image:</span>
                      <img
                        src={patient.heart_audio_image}
                        alt="Heart Audio"
                        className="w-24 h-auto mt-2 cursor-pointer"
                        onClick={() => expandImage(patient.heart_audio_image)}
                      />
                      {expandedImage === patient.heart_audio_image && (
                        <button
                          className="text-blue-500 hover:underline mt-2"
                          onClick={() => downloadImage(patient.heart_audio_image)}
                        >
                          Download Image
                        </button>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold">Lung Audio Image:</span>
                      <img
                        src={patient.lung_audio_image}
                        alt="Lung Audio"
                        className="w-24 h-auto mt-2 cursor-pointer"
                        onClick={() => expandImage(patient.lung_audio_image)}
                      />
                      {expandedImage === patient.lung_audio_image && (
                        <button
                          className="text-blue-500 hover:underline mt-2"
                          onClick={() => downloadImage(patient.lung_audio_image)}
                        >
                          Download Image
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="text-sm">
                    <a
                      href={patient.audio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Click to download audio
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {expandedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center"
          onClick={closeExpandedImage}
        >
          <img src={expandedImage} alt="Expanded Image" className="max-h-full max-w-full" />
        </div>
      )}
    </div>
  );
};

export default GetPatient;
