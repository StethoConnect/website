import NavBar from "./NavBar";
import { useState } from "react";
import { flaskapi } from "../../ngrok";

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
      const response = await fetch(flaskapi + "/predictHeart", {
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
    link.href = flaskapi + "/download";
    link.download = "recording.wav";
    link.click();
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Process Recorded Audio
        </h1>
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

          {predictedLabel.status ? (
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
          ) : (
            <h1 className="text-gray-800">NO Result</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default ProcessAudio;
