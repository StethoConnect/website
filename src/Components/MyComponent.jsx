import React, { useState, useEffect } from "react";

const MyComponent = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [ws, setWs] = useState(null);
  const [recordingStarted, setRecordingStarted] = useState(false);

  useEffect(() => {
    const newWs = new WebSocket("ws://192.168.213.32:8765");
    setWs(newWs);

    newWs.onopen = () => {
      console.log("WebSocket connection established.");
    };

    newWs.onmessage = (event) => {
      if (!audioContext) {
        const newAudioContext = new AudioContext();
        setAudioContext(newAudioContext);
      }
      const audioData = event.data;
      processAudioData(audioData);
    };

    newWs.onclose = (event) => {
      console.log("WebSocket connection closed:", event.reason);
      // Implement reconnect logic if needed
    };

    newWs.onerror = (error) => {
      console.error("WebSocket error:", error);
      // Implement error handling logic
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const processAudioData = (audioData) => {
    if (audioContext) {
      audioContext.decodeAudioData(audioData, (buffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
      });
    }
  };

  const handleRecordClick = () => {
    if (!recordingStarted) {
      setRecordingStarted(true);
      // Resume the AudioContext on user gesture
      if (audioContext) {
        audioContext.resume().then(() => {
          console.log("Playback resumed successfully");
        });
      }
      // Send a message to start recording on the Raspberry Pi
      if (ws) {
        ws.send('startRecording');
      }
      // Set a timer to stop recording after 20 seconds
      setTimeout(() => {
        setRecordingStarted(false);
        if (ws) {
          ws.send('stopRecording');
        }
        console.log("Recording stopped after 20 seconds.");
      }, 20000); // 20 seconds in milliseconds
    }
  };

  return (
    <div>
      {/* Your UI components */}
      <button onClick={handleRecordClick}>Record</button>
    </div>
  );
};

export default MyComponent;