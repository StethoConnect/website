// import React, { useContext } from "react";

// import DataContext from "./DataContext";
// import DoctorDashboard from "./DoctorDashboard";
// import NavPrev from "./NavPre";

// function Home() {
//   // Use the context
//   const { data } = useContext(DataContext);

//   return (
//     <>
//       {data.user ? (
//         <DoctorDashboard />
//       ) : (
//         <>
//           <NavPrev />
//           <div className="container mt-5">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
//               StethoConnect
//             </h1>
//             <div className="row mt-4">
//               <div className="col-md-6">
//                 <p>
//                   Welcome to the official website of StethoConnect! Our project
//                   is a cost-effective digital stethoscope built with the help of
//                   TinyML, cloud technology, and web technology.
//                 </p>
//                 {/* <Scanner /> */}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default Home;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "./DataContext";
import NavPrev from "./NavPre";
import DoctorDashboard from "./DoctorDashboard";

function Home() {
  // Use the context
  const { data } = useContext(DataContext);

  return (
    <>
      {data.user ? (
        <DoctorDashboard />
      ) : (
        <>
          <NavPrev />
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold mb-4">StethoConnect</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xl mb-4">
                    Welcome to the official website of StethoConnect! Our
                    project is a cost-effective digital stethoscope built with
                    the help of TinyML, cloud technology, and web technology.
                  </p>
                  <a
                    href="https://github.com/StethoConnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200"
                  >
                    Learn More
                  </a>
                </div>
                <div>{/* Add any additional content here */}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
