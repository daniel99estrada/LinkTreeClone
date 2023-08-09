import React from 'react';

const Link = ({ linkUrl, linkName, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <div className="flex justify-between items-center border rounded px-4 py-2 bg-white">
      <button
        className="text-blue-500 hover:text-blue-700 focus:outline-none font-sans font-medium text-black"
        onClick={() => window.open(linkUrl, '_blank')}
      >
        {linkName}
      </button>
      <button
        className="text-red-500 hover:text-red-700 focus:outline-none"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  );
};

export default Link;
