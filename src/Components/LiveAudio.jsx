import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const LiveAudio = () => {
  const socketRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:5001/ws');

    socketRef.current.on('connect', () => {
      console.log('WebSocket connection established');
    });

    socketRef.current.on('audio', (audioData) => {
      const audioArray = new Int16Array(audioData);
      audioRef.current.setTheSource(audioArray, audioRef.current.sampleRate);
    });

    socketRef.current.on('disconnect', () => {
      console.log('WebSocket connection closed');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <audio ref={audioRef} controls />
  );
};

export default LiveAudio;