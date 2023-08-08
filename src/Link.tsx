import React from 'react';

interface LinkProps {
  linkUrl: string;
  linkName: string;
  onDelete: () => void; // Add the onDelete prop
}

const Link: React.FC<LinkProps> = ({ linkUrl, linkName, onDelete }) => {
  console.log('Received linkName:', linkName);

  const handleDeleteClick = () => {
    onDelete(); // Call the onDelete function to remove the link
  };

  return (
    <div>
      <button onClick={() => window.open(linkUrl, '_blank')}>{linkName}</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};


export default Link;
