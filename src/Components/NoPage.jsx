import React from "react";

function NoPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">404 PAGE NOT FOUND</h1>
      <img
        src="https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif"
        alt="404 Funny"
        className="w-64"
      />
    </div>
  );
}

export default NoPage;
