import React from "react";

const AlertBox = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-red-500 text-white p-4 rounded shadow-md">
        <p>{message}</p>
        <button className="mt-2 px-4 py-1 bg-red-700 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
