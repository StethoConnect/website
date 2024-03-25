import { flaskapi } from "../../ngrok";
import NavBar from "./NavBar";
import { useState } from "react";

function ProcessAudio() {
  const [predictedLabel, setPredictedLabel] = useState({
    heart: null,
    lungs: null,
    status: false,
  });

  const lungsSoundPrediction = async () => {
    try {
      const response = await fetch(flaskapi + "/predictLungs", {
        method: "POST",
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
      const response = await fetch(fastapi +"/predictHeart", {
        method: "POST",
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
    link.href = fastapi +"/download";
    link.download = "recording.wav";
    link.click();
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Process Recorded Audio
        </h1>
        <div className="flex flex-col justify-items-center p-5">
          <label
            htmlFor="Heart sound prediction"
            className="font-bold mb-2 text-gray-800"
          >
            Heart Sound Classification
          </label>
          <button
            onClick={heartSoundPrediction}
            className="bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-4 rounded-md mb-4"
          >
            Predict
          </button>

          <label
            htmlFor="Lungs sound prediction"
            className="font-bold mb-2 text-gray-800"
          >
            Lungs Sound Classification
          </label>
          <button
            onClick={lungsSoundPrediction}
            className="bg-cyan-300 hover:bg-cyan-400 text-gray-800 font-bold py-2 px-4 rounded-md mb-4"
          >
            Predict
          </button>

          {/* result of the prediction */}

          {predictedLabel.status ? (
            <div className="result mt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Prediction Results
              </h2>
              <table className="table-auto border-collapse border border-gray-400 bg-white rounded-md shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border border-gray-400">
                      Heart Result
                    </th>
                    <th className="px-4 py-2 border border-gray-400">
                      Lungs Result
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border border-gray-400">
                      {predictedLabel.heart}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {predictedLabel.lungs}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={downloadAudio}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mt-4"
              >
                Download Recorded Audio
              </button>
            </div>
          ) : (
            <h1 className="text-gray-800">NO Result</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default ProcessAudio;
