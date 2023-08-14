import React from 'react';

type LinkProps = {
  linkUrl: string;
  linkName: string;
  onDelete: () => void;
  editMode: boolean;
};

const Link = ({ linkUrl, linkName, onDelete, editMode }: LinkProps) => {
  const handleDeleteClick = () => {
    onDelete();
  };

  const openLinkInNewTab = () => {
    const formattedLinkUrl = linkUrl.startsWith('http://') || linkUrl.startsWith('https://')
      ? linkUrl
      : 'http://' + linkUrl;

    window.open(formattedLinkUrl, '_blank');
  };

  const containerClassName = editMode
    ? 'flex justify-between items-center border rounded-lg px-4 py-2 bg-white transition-transform transform-gpu hover:bg-slate-200'
    : 'flex justify-center items-center border rounded-lg px-4 py-2 bg-white transition-transform transform-gpu hover:bg-slate-200';

  return (
    <div className={containerClassName}>
      <button
        className="flex-1 hover:text-slate-500 focus:outline-none font-sans font-medium text-black"
        onClick={openLinkInNewTab}
      >
        {linkName}
      </button>
      {editMode && (
        <button
          className="text-red-500 hover:text-red-700 focus:outline-none font-semibold"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Link;
