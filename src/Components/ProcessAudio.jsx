import NavBar from "./NavBar";
import { useState, useContext, useEffect } from "react";
import { flaskapi, ngrok } from "../../ngrok";
import DataContext from "./DataContext";

function ProcessAudio() {
  const [predictedLabel, setPredictedLabel] = useState({
    heart: null,
    lungs: null,
    status: false,
  });

  const { data } = useContext(DataContext);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const lungsSoundPrediction = async () => {
    try {
      const response = await fetch(flaskapi + "/predictLungs", {
        method: "POST",
        body: JSON.stringify(selectedPatientId,data.idToken),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setPredictedLabel((prev) => ({
          ...prev,
          lungs: data.predicted_class_label || null,
          status: true,
        }));
      } else {
        alert("Server Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const heartSoundPrediction = async () => {
    try {
      const formData = new FormData();
      formData.append("patient_id", selectedPatientId);
      formData.append("idToken", data.idToken);
      const response = await fetch(flaskapi + "/predictHeart", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setPredictedLabel((prev) => ({
          ...prev,
          heart: data.predicted_label || null,
          status: true,
        }));
      } else {
        alert("Server Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const downloadAudio = () => {
    const link = document.createElement("a");
    link.href = flaskapi + "/download";
    link.download = "recording.wav";
    link.click();
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(ngrok + "/get_all_patients", {
        headers: {
          accept: "application/json",
          "id-token": data.idToken, // Replace with your actual ID token
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPatients(Object.values(data.all_patients));
      } else {
        alert("Failed to fetch patients");
      }
    } catch (error) {
      alert("Error fetching patients:", error);
    }
  };

  const handlePatientSelect = (event) => {
    setSelectedPatientId(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredPatients = patients.filter((patient) =>
  patient.name ? patient.name.toLowerCase().includes(searchQuery.toLowerCase()) : false
);


  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Process Recorded Audio
        </h1>
        <div className="flex flex-col justify-items-center p-5">
          {/* Dropdown list to select a patient */}
          <label htmlFor="patients" className="mb-2 font-bold text-gray-800">
            Select Patient:
          </label>
          <select
            id="patients"
            value={selectedPatientId}
            onChange={handlePatientSelect}
            className="mb-4 rounded-md bg-cyan-300 px-4 py-2 font-bold text-gray-800"
          >
            <option value="">Select a Patient</option>
            {filteredPatients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
            className="mb-4 rounded-md bg-cyan-100 px-4 py-2 font-bold text-gray-800"
          />

          <div className="flex flex-col justify-items-center p-5">
            <label
              htmlFor="Heart sound prediction"
              className="mb-2 font-bold text-gray-800"
            >
              Heart Sound Classification
            </label>
            <button
              onClick={heartSoundPrediction}
              className="mb-4 rounded-md bg-cyan-300 px-4 py-2 font-bold text-gray-800 hover:bg-cyan-400"
            >
              Predict
            </button>

            <label
              htmlFor="Lungs sound prediction"
              className="mb-2 font-bold text-gray-800"
            >
              Lungs Sound Classification
            </label>
            <button
              onClick={lungsSoundPrediction}
              className="mb-4 rounded-md bg-cyan-300 px-4 py-2 font-bold text-gray-800 hover:bg-cyan-400"
            >
              Predict
            </button>

            {/* result of the prediction */}
            {predictedLabel.status && (
              <div className="result mt-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Prediction Results
                </h2>
                <table className="table-auto border-collapse rounded-md border border-gray-400 bg-white shadow-md">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 px-4 py-2">
                        Heart Result
                      </th>
                      <th className="border border-gray-400 px-4 py-2">
                        Lungs Result
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 px-4 py-2">
                        {predictedLabel.heart}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {predictedLabel.lungs}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  onClick={downloadAudio}
                  className="mt-4 rounded-md bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
                >
                  Download Recorded Audio
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProcessAudio;
