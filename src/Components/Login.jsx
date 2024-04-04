// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ngrok } from "../../ngrok";
// import NavPrev from "./NavPre";
// import DataContext from "./DataContext";

// function Login() {
//   const navigate = useNavigate();
//   const { setData } = useContext(DataContext);

//   // State for form inputs
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     // Prepare the data to be sent in the request
//     const loginData = { email, password };

//     try {
//       const response = await fetch(ngrok + "/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "ngrok-skip-browser-warning": "69420",
//         },
//         body: JSON.stringify(loginData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("login sucess:", data);
//         setData({
//           user: data.token.displayName,
//           idToken: data.token.idToken,
//           secret: null,
//           pswd: password,
//         });

//         // Redirect to doctor dashboard
//         navigate("/doctor-dashboard");
//       } else {
//         // Handle errors, e.g., show a message to the user
//         console.error("Login failed");
//       }
//     } catch (error) {
//       console.error("There was an error!", error);
//     }
//   };

//   return (
//     <>
//       <NavPrev />
//       <div className="container mx-auto p-4">
//         <h2 className="mb-4 text-xl font-bold">Doctor Login</h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <div>
//             <label
//               htmlFor="email"
//               className="mb-2 block text-sm font-medium text-gray-900"
//             >
//               Email
//             </label>
//             <input
//             required
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               type="email"
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="mb-2 block text-sm font-medium text-gray-900"
//             >
//               Password
//             </label>
//             <input
//             required
//               id="password"
//               autoComplete="on"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Login;




import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ngrok } from "../../ngrok";
import NavPrev from "./NavPre";
import DataContext from "./DataContext";
import AlertBox from "./AlertBox"; // Import the AlertBox component

function Login() {
  const navigate = useNavigate();
  const { setData } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      const response = await fetch(ngrok + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        setData({
          user: data.token.displayName,
          idToken: data.token.idToken,
          secret: null,
          pswd: password,
        });
        navigate("/doctor-dashboard");
      } else {
        // Handle errors
        const errorMessage = "Login failed. Please check your credentials.";
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const closeErrorAlert = () => {
    setError(null);
  };

  return (
    <>
      <NavPrev />
      {error && <AlertBox message={error} onClose={closeErrorAlert} />} {/* Render the AlertBox component */}
      <div className="bg-gray-900 min-h-screen text-white flex justify-center items-center">
        <div className="container mx-auto p-4">
          <h2 className="mb-4 text-xl font-bold text-center">Doctor Login</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Email
              </label>
              <input
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="block w-full rounded-lg border border-gray-400 bg-gray-800 p-2.5 text-sm text-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Password
              </label>
              <input
                required
                id="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="block w-full rounded-lg border border-gray-400 bg-gray-800 p-2.5 text-sm text-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
