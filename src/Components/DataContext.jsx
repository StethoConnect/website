// import React, { createContext, useState } from "react";

// // Create a context
// const DataContext = createContext();

// // Create a provider component
// export const DataProvider = ({ children }) => {
//   const [data, setData] = useState({
//     user: null,
//     idToken: null,
//     secret: null,
//     pswd: null,
//     patientId: null,
//   });

//   return (
//     <DataContext.Provider value={{ data, setData }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export default DataContext;



import React, { createContext, useState, useEffect } from "react";

// Create a context
const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  // Load initial data from localStorage or use default values
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : {
      user: null,
      idToken: null,
      secret: null,
      pswd: null,
      patientId: null,
    };
  });

  // Update localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("data");
    setData({
      user: null,
      idToken: null,
      secret: null,
      pswd: null,
      patientId: null,
    });
  };

  return (
    <DataContext.Provider value={{ data, setData, logout }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
