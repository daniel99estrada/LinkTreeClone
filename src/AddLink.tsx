import React, { useState } from 'react';

interface AddLinkProps {
  onAddLink: (name: string, url: string) => void;
}

const AddLink: React.FC<AddLinkProps> = ({ onAddLink }) => {
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkName(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(event.target.value);
  };

  const handleAddClick = () => {
    // Call the onAddLink function with the link name and link URL
    onAddLink(linkName, linkUrl);

    // Clear the input fields after adding the link
    setLinkName('');
    setLinkUrl('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Link Name"
        value={linkName}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Link URL"
        value={linkUrl}
        onChange={handleUrlChange}
      />
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
};

export default AddLink;
