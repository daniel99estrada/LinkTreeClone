import { useState } from 'react';

const AddLink = ({ onAddLink }) => {
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleNameChange = (event) => {
    setLinkName(event.target.value);
  };

  const handleUrlChange = (event) => {
    setLinkUrl(event.target.value);
  };

  const handleAddClick = () => {
    onAddLink(linkName, linkUrl);
    setLinkName('');
    setLinkUrl('');
  };

  return (
    <div className="flex space-x-2">
      <input
        className="border rounded px-2 py-1 w-1/3"
        type="text"
        placeholder="Link Name"
        value={linkName}
        onChange={handleNameChange}
      />
      <input
        className="border rounded px-2 py-1 w-2/3"
        type="text"
        placeholder="Link URL"
        value={linkUrl}
        onChange={handleUrlChange}
      />
      <button
        className="inline-block bg-zinc-400 hover:bg-zinc-500  text-white px-2 rounded px-4 py-2"
        onClick={handleAddClick}
      >
        Add
      </button>
    </div>
  );
};

export default AddLink;
