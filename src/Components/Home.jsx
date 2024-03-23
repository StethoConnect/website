import React, { useContext } from "react";

import DataContext from "./DataContext";
import DoctorDashboard from "./DoctorDashboard";
import NavPrev from "./NavPre";

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
          <div className="container mt-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              StethoConnect
            </h1>
            <div className="row mt-4">
              <div className="col-md-6">
                <p>
                  Welcome to the official website of StethoConnect! Our project
                  is a cost-effective digital stethoscope built with the help of
                  TinyML, cloud technology, and web technology.
                </p>
                {/* <Scanner /> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
