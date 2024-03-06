import React, { useState } from "react";

function RecordAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);

  const startRecording = async () => {
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
  };

  return (
    <div className="flex flex-col items-center">
      {!isRecording ? (
        <button onClick={startRecording} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5">
          Start Recording
        </button>
      ) : (
        <button disabled className="bg-gray-500 text-white font-bold py-2 px-4 rounded my-5">
          Recording...
        </button>
      )}
    </div>
  );
}

export default RecordAudio;
