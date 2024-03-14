import React, { useState } from "react";

function RecordAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [wave, setwave] = useState(false);
  const[recstaus,setrecstatus] =useState(false);
  const [toggleState, setToggleState] = useState("left");

  const LiveAudio = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const mediaStreamSource = audioContext.createMediaStreamSource(stream);
      const audioPlayer = new Audio();
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      audioPlayer.srcObject = stream;
      audioPlayer.play();

      recorder.ondataavailable = function(event) {
        chunks.push(event.data);
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        audioPlayer.src = url;
        audioPlayer.play();
      };

      recorder.start();

      setTimeout(() => {
        recorder.stop();
        stream.getTracks().forEach(track => track.stop());
        setAudioStream(null);
        setIsRecording(false);
      }, 10000);

      setAudioStream(stream);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }

    setIsRecording(false);
  };

  const startRecording = async () => {
    try {
        setwave(false);
        setrecstatus(true);
      const response = await fetch('http://127.0.0.1:5000/record', {
        method: 'POST',
      });
    
      if(response.status==200){
        setwave(true);
        console.log(response)
        response.blob().then(blob=> showInOtherTab(blob))

      } // Log the response from the server
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };
  
  function showInOtherTab(blob) {
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }


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


    <div className="flex justify-center text-9xl bg-black text-white m-0 p-5 mb-40"> Record Audio</div>
    <div className="flex justify-center text-2xl mx-8 my-2">Here you can listern to live audio ,Record audio in wave format,process the audio aswell using our ml models</div>
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

      {recstaus? (wave?(
        <h1>File Saved  Successfully.</h1>
      ):(
        <h1>Recording .............</h1>)):(
            <p>.........</p>)
        }
    </div>
    </>
  );
}

export default RecordAudio;
