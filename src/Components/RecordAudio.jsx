import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import { ngrok } from "../../ngrok";

function RecordAudio() {
  const navi = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [wave, setWave] = useState(false);
  const [recStatus, setRecStatus] = useState(false);
  const [toggleState, setToggleState] = useState("left");
  const [audioURL, setAudioURL] = useState(null);

  const LiveAudio = async () => {
    // setIsRecording(true);
    // try {
    //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //   const audioPlayer = new Audio();
    //   audioPlayer.srcObject = stream;
    //   audioPlayer.play();
    // } catch (error) {
    //   console.error('Error accessing microphone:', error);
    // }
    // setIsRecording(false);
  };

  const startRecording = async () => {
    try {
      setWave(false);
      setRecStatus(true);
      const response = await fetch('http://127.0.0.1:5100/record', {
        method: 'POST',
      });
      if (response.status === 200) {
        setWave(true);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      }
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };
  
  const handleDownload = () => {
    // const link = document.createElement("a");
    // link.href = audioURL;
    // link.download = "Recording.wav";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  const ProcessAudio = async () => {
    // try {
    //   if (audioURL) {
    //     const blob = await fetch(audioURL).then(response => response.blob());
    //     const formData = new FormData();
    //     formData.append('audio', blob, 'recording.wav');
  
    //     const processingResponse = await fetch(ngrok+'/classify_heart_audio/', {
    //       method: 'POST',
    //       body: formData,
    //     });
  
    //     if (processingResponse.ok) {
    //       const { predicted_label } = await processingResponse.json();
    //       navi("/process-audio", { predictedLabel: predicted_label });
    //     } else {
    //       console.error('Error processing audio:', processingResponse.statusText);
    //     }
    //   } else {
    //     console.error('No audio URL available.');
    //   }
    // } catch (error) {
    //   console.error('Error processing audio:', error);
    // }
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
      <div className="flex justify-center text-9xl bg-black text-white m-0 p-5 mb-40"> Record Audio</div>
      <div className="flex justify-center text-2xl mx-8 my-2">Here you can listen to live audio, record audio in wave format, and process the audio as well using our ML models.</div>
      <div className="flex flex-col items-center">
        <div>
          <button
            onClick={toggleRight}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5 ${toggleState === "left" ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={toggleState === "right"}
          >
            Record Audio
          </button>
          <button
            onClick={toggleLeft}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5 ${toggleState === "right" ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={toggleState === "left"}
          >
            Live Audio
          </button>
        </div>
        {!isRecording ? (
          <button onClick={toggleState === "left" ? LiveAudio : startRecording} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-5">
            Start
          </button>
        ) : (
          <button disabled className="bg-gray-500 text-white font-bold py-2 px-4 rounded my-5">
            Recording...
          </button>
        )}

        {recStatus && (
          wave ? (
            <>
              <h1 className=" m-0">Audio Recorded successfully.</h1>
              <div className="flex justify-between p-10 flex-col "> 

               { /* <button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5">
                  Download Recording
                </button>*/
}


                <button onClick={()=>navi('/process-audio')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5">
                  Process Audio
                </button>
              </div>
            </>
          ) : (
            <h1 className = " m-16">Recording in progress...</h1>
          )
        )}
      </div>
    </>
  );
}

export default RecordAudio;
