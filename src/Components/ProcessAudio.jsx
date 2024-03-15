import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ProcessAudio() {
  const [recording, setRecording] = useState(null);
  const [predictedLabel, setPredictedLabel] = useState({
    heart:null ,
    lungs: null,
    status: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("No file selected");
      return;
    } else {
      // Handle file upload and processing here
    }
  };

  const handleOnChange = (e) => {
    setRecording(e.target.files[0]);
    console.log("File selected", recording);
  };

  
  const lungsSoundPrediction = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5100/predictLungs", {
        method: "POST",
      });

      if (response.status == 200) {
        let data = await response.json();
        console.log(data.result);
        //update the predicted label heart and update the status to true
        setPredictedLabel((prev) => ({
          ...prev,
          lungs: data.result,
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
      const response = await fetch("http://127.0.0.1:5100/predictHeart", {
        method: "POST",
      });

      if (response.status == 200) {
        let data = await response.json();
        console.log(data.result);
        //update the predicted label heart and update the status to true
        setPredictedLabel((prev) => ({
          ...prev,
          heart: data.result,
          status: true,
        }));
      } else {
        alert("Server Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <NavBar />
      <h1>Upload Audio File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="wav" onChange={handleOnChange} />
        <button type="submit">Upload</button>
      </form>

      <h1>Process Recorded Audio</h1>
      <div className="flex flex-col justify-items-center p-5">
        <label htmlFor="Heart sound prediction">
          Heart Sound Classification
        </label>
        <button
          onClick={heartSoundPrediction}
          className="bg-cyan-300 h-auto w-16 rounded-sm"
        >
          Predict
        </button>

        <label htmlFor="Lungs sound prediction">
          Lungs Sound Classification
        </label>
        <button
          onClick={lungsSoundPrediction}
          className="bg-cyan-300 h-auto w-16 rounded-sm"
        >
          Predict
        </button>

        {/* result of the prediction  */}

        {predictedLabel.status ? (
          <div className="result">
            <table>
              <thead>
                <tr>
                  <th>Heart Result</th>
                  <th>Lungs Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{predictedLabel.heart}</td>
                  <td>{predictedLabel.lungs}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <h1>NO Result</h1>
        )}
      </div>
    </>
  );
}
export default ProcessAudio;
