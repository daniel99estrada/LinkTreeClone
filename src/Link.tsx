import React from 'react';

const Link = ({ linkUrl, linkName, onDelete, editMode }) => {
  const handleDeleteClick = () => {
    onDelete();
  };

  const openLinkInNewTab = () => {
    if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
      window.open(linkUrl, '_blank');
    } else {
      window.open('http://' + linkUrl, '_blank');
    }
  };

  const containerClassName = editMode
    ? 'flex justify-between items-center border rounded-lg px-4 py-2 bg-white'
    : 'flex justify-center items-center border rounded-lg px-4 py-2 bg-white';

  return (
    <div className={containerClassName}>
      <button
        className="hover:text-blue-700 focus:outline-none font-sans font-medium text-black"
        onClick={openLinkInNewTab}
      >
        {linkName}
      </button>
      {editMode && (
        <button
          className="text-red-500 hover:text-red-700 focus:outline-none "
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Link;
