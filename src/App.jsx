import React, { useState } from "react";
import Scanner from "./Components/Scanner";

import FooterSteth from './Components/FooterSteth.jsx'


function App() {

  return (
<>
    <div className="container mt-5">
      <h1 className="display-4">Official StethoConnect Website</h1>
      <div className="row mt-4">
        <div className="col-md-6">
          <p>Welcome to the official website of StethoConnect! Our project is a cost-effective digital stethoscope built with the help of TinyML, cloud technology, and web technology.</p>
         

         <Scanner />
        </div>
      </div>
     
    </div>
    <FooterSteth />
    </>
  );
}

export default App;
