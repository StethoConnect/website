import React from 'react';

function Card({ title, content }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">
        {content}
      </p>
      
    </div>
  );
}

export default Card;
