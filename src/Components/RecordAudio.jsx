// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import NavBar from "./NavBar";
// import { flaskapi, ngrok } from "../../ngrok";
// import DataContext from "./DataContext";
// import { useContext } from "react";

// function RecordAudio() {
//   const navi = useNavigate();
//   const [isRecording, setIsRecording] = useState(false);
//   const [wave, setWave] = useState(false);
//   const [recStatus, setRecStatus] = useState(false);
//   const [toggleState, setToggleState] = useState("left");
//   const [audioURL, setAudioURL] = useState(null);
//   const { data } = useContext(DataContext);
//   const [audioContext, setAudioContext] = useState(null);
//   const [audioSource, setAudioSource] = useState(null);

//   useEffect(() => {
//     const context = new (window.AudioContext || window.webkitAudioContext)();
//     setAudioContext(context);
//     return () => {
//       context.close();
//     };
//   }, []);

//   const LiveAudio = async () => {
//     setIsRecording(true);
//     try {
//       //   const response = await fetch("http://127.0.0.1:5454/audio");
//       //   const reader = response.body.getReader();
//       //   const mediaSource = new MediaSource();
//       //   const audioElement = new Audio();
//       //   audioElement.src = URL.createObjectURL(mediaSource);
//       //   audioElement.play();
//       //   mediaSource.addEventListener("sourceopen", () => {
//       //     const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
//       //     const readStream = async () => {
//       //       const { done, value } = await reader.read();
//       //       if (done) {
//       //         mediaSource.endOfStream();
//       //         return;
//       //       }
//       //       sourceBuffer.appendBuffer(value);
//       //       readStream();
//       //     };
//       //     readStream();
//       //   });
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//     setIsRecording(false);
//   };

//   // ... (the rest of the code remains the same)
//   //

//   const startRecording = async () => {
//     try {
//       setWave(false);
//       setRecStatus(true);
//       const response = await fetch(flaskapi + "/record", {
//         method: "POST",
//       });
//       if (response.status === 200) {
//         setWave(true);
//         const blob = await response.blob();
//         const url = URL.createObjectURL(blob);
//         setAudioURL(url);
//       }
//     } catch (error) {
//       console.error("Error starting recording:", error);
//     }
//   };

//   const handleDownload = () => {
//     // const link = document.createElement("a");
//     // link.href = audioURL;
//     // link.download = "Recording.wav";
//     // document.body.appendChild(link);
//     // link.click();
//     // document.body.removeChild(link);
//   };

//   const ProcessAudio = async () => {
//     // try {
//     //   if (audioURL) {
//     //     const blob = await fetch(audioURL).then(response => response.blob());
//     //     const formData = new FormData();
//     //     formData.append('audio', blob, 'recording.wav');
//     //     const processingResponse = await fetch(ngrok+'/classify_heart_audio/', {
//     //       method: 'POST',
//     //       body: formData,
//     //     });
//     //     if (processingResponse.ok) {
//     //       const { predicted_label } = await processingResponse.json();
//     //       navi("/process-audio", { predictedLabel: predicted_label });
//     //     } else {
//     //       console.error('Error processing audio:', processingResponse.statusText);
//     //     }
//     //   } else {
//     //     console.error('No audio URL available.');
//     //   }
//     // } catch (error) {
//     //   console.error('Error processing audio:', error);
//     // }
//   };

//   const toggleLeft = () => {
//     if (toggleState !== "left") {
//       setToggleState("left");
//     }
//   };

//   const toggleRight = () => {
//     if (toggleState !== "right") {
//       setToggleState("right");
//     }
//   };

//   return (
//     <>
//       <h1>
//         testing
//         {data.user}
//       </h1>

//       <NavBar />
//       <div className="m-0 mb-40 flex justify-center bg-black p-5 text-9xl text-white">
//         {" "}
//         Record Audio
//       </div>
//       <div className="mx-8 my-2 flex justify-center text-2xl">
//         Here you can listen to live audio, record audio in wave format, and
//         process the audio as well using our ML models.
//       </div>
//       <div className="flex flex-col items-center">
//         <div>
//           <button
//             onClick={toggleRight}
//             className={`my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${toggleState === "left" ? "cursor-not-allowed opacity-50" : ""}`}
//             disabled={toggleState === "right"}
//           >
//             Record Audio
//           </button>
//           <button
//             onClick={toggleLeft}
//             className={`my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${toggleState === "right" ? "cursor-not-allowed opacity-50" : ""}`}
//             disabled={toggleState === "left"}
//           >
//             Live Audio
//           </button>
//         </div>
//         {!isRecording ? (
//           <button
//             onClick={toggleState === "left" ? LiveAudio : startRecording}
//             className="my-5 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
//           >
//             Start
//           </button>
//         ) : (
//           <button
//             disabled
//             className="my-5 rounded bg-gray-500 px-4 py-2 font-bold text-white"
//           >
//             Recording...
//           </button>
//         )}

//         {recStatus &&
//           (wave ? (
//             <>
//               <h1 className=" m-0">Audio Recorded successfully.</h1>
//               <div className="flex flex-col justify-between p-10 ">
//                 {/* <button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5">
//                       Download Recording
//                     </button>*/}

//                 <button
//                   onClick={() => navi("/process-audio")}
//                   className="my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
//                 >
//                   Process Audio
//                 </button>
//               </div>
//             </>
//           ) : (
//             <h1 className=" m-16">Recording in progress...</h1>
//           ))}
//       </div>
//     </>
//   );
// }

// export default RecordAudio;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { flaskapi } from "../../ngrok";

const RecordAudio = () => {
  const navi = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [wave, setWave] = useState(false);
  const [recStatus, setRecStatus] = useState(false);
  const [toggleState, setToggleState] = useState("left");
  const [audioURL, setAudioURL] = useState(null);

  const LiveAudio = async () => {
    setIsRecording(true);
    try {
      const response = await fetch(flaskapi + "/start_loopback");
      if (response.status === 200) {
        setWave(true);
      }
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopLoopback = async () => {
    try {
      const response = await fetch(flaskapi + "/stop_loopback");
      if (response.status === 200) {
        setIsRecording(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  const startRecording = async () => {
    try {
      setWave(false);
      setRecStatus(true);
      const response = await fetch(flaskapi + "/record", {
        method: "POST",
      });
      if (response.status === 200) {
        setWave(true);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      }
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const toggleLeft = () => {
    if (toggleState !== "left") {
      setToggleState("left");
    }
  };

  const toggleRight = () => {
    if (toggleState !== "right") {
      setToggleState("right");
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="m-0 mb-40 flex justify-center bg-black p-5 text-9xl text-white">
          Record Audio
        </div>
        <div className="mx-8 my-2 flex justify-center text-2xl">
          Here you can listen to live audio, record audio in wave format, and
          process the audio as well using our ML models.
        </div>
        <div className="flex flex-col items-center">
          <div>
            <button
              onClick={toggleRight}
              className={`my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
                toggleState === "left" ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={toggleState === "right"}
            >
              Record Audio
            </button>
            <button
              onClick={toggleLeft}
              className={`my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
                toggleState === "right" ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={toggleState === "left"}
            >
              Live Audio
            </button>
          </div>
          {!isRecording ? (
            <button
              onClick={toggleState === "left" ? LiveAudio : startRecording}
              className="my-5 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
              Start
            </button>
          ) : (
            <button
              onClick={stopLoopback}
              className="my-5 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              Stop Live Audio
            </button>
          )}

          {recStatus &&
            (wave ? (
              <>
                <h1 className=" m-0">Audio Recorded successfully.</h1>
                <div className="flex flex-col justify-between p-10 ">
                  <button
                    onClick={() => navi("/process-audio")}
                    className="my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    Process Audio
                  </button>
                </div>
              </>
            ) : (
              <h1 className=" m-16">Recording in progress...</h1>
            ))}
        </div>
      </div>
    </>
  );
};

export default RecordAudio;
