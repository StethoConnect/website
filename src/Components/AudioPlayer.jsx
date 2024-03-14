import React, { useEffect, useRef } from 'react';

function AudioPlayer() {
  const audioRef = useRef(null);
  const websocket = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    websocket.current = new WebSocket('ws://localhost:8080');

    websocket.current.onopen = () => {
      console.log('WebSocket connected');
    };

    websocket.current.onmessage = (event) => {
      // Handle incoming audio data
      const audioData = event.data;
      // Play audio using Web Audio API
      playAudio(audioData);
    };

    websocket.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      // Cleanup WebSocket connection when component unmounts
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, []);

  const playAudio = (audioData) => {
    // Decode audio data and play using Web Audio API
    const audioContext = new AudioContext();
    audioContext.decodeAudioData(audioData, (buffer) => {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();
    });
  };

  return (
    <div>
      <audio ref={audioRef} controls />
    </div>
  );
}

export default AudioPlayer;
