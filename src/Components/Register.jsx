// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { flaskapi, ngrok } from "../../ngrok";
// import NavPrev from "./NavPre";
// import axios from "axios";

// function Register() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const registrationData = { email, name, password };

//     try {
//       const response = await fetch(ngrok + "/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "ngrok-skip-browser-warning": "69420",
//         },
//         body: JSON.stringify(registrationData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Registration successful:", data);
//       alert("Registration Successful");
//       const firstName = name;

//       axios
//         .post( flaskapi +  "/signup", {
//           name,
//           password,
//           email,
//           firstName,
//         })
//         .then((r) => console.log(r))
//         .catch((e) => console.log(JSON.stringify(e.response.data)));

//       navigate("/login");
//     } catch (error) {
//       console.error("Registration failed:", error);
//       alert("Registration Failed");
//     }
//   };

//   return (
//     <>
//       <NavPrev />

//       <div className="container mx-auto p-4">
//         <h2 className="mb-4 text-xl font-bold">Register Page</h2>
//         <form onSubmit={handleSubmit} className="form space-y-3">
//           <div>
//             <label
//               htmlFor="email"
//               className="mb-2 block text-sm font-medium text-gray-900"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="name"
//               className="mb-2 block text-sm font-medium text-gray-900"
//             >
//               Name
//             </label>
//             <input
//               id="name"
//               type="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Name"
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
//               required
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
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
//               autoComplete="on"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Register;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavPrev from "./NavPre";
import axios from "axios";
import AlertBox from "./AlertBox"; // Import the AlertBox component
import { ngrok } from "../../ngrok";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationData = { email, name, password };

    try {
      const response = await fetch(ngrok+"/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      alert("Registration Successful");
      const firstName = name;

      axios
        .post( flaskapi +  "/signup", {
          name,
          password,
          email,
          firstName,
        })
        .then((r) => console.log(r))
        .catch((e) => console.log(JSON.stringify(e.response.data)));

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
      setError("Registration Failed"); // Set error message
    }
  };

  const closeErrorAlert = () => {
    setError(null); // Clear error message
  };

  return (
    <>
      <NavPrev />
      <div className="bg-gray-900 min-h-screen text-white flex justify-center items-center">
        <div className="container mx-auto p-4">
          <h2 className="mb-4 text-xl font-bold text-center">Register Page</h2>
          {error && <AlertBox message={error} onClose={closeErrorAlert} />} {/* Render the AlertBox component */}
          <form onSubmit={handleSubmit} className="form space-y-3">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="block w-full rounded-lg border border-gray-400 bg-gray-800 p-2.5 text-sm text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="block w-full rounded-lg border border-gray-400 bg-gray-800 p-2.5 text-sm text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
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
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-gray-400 bg-gray-800 p-2.5 text-sm text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                autoComplete="on"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
