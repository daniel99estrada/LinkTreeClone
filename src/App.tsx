import React, { useState, useEffect } from 'react';
import Link from './Link';
import AddLink from './AddLink';

function App() {
  const [links, setLinks] = useState<{ name: string; url: string }[]>([]);

  const addLink = (name: string, url: string) => {
    const newLink = { name, url };
    setLinks([...links, newLink]);
  };

  useEffect(() => {
    console.log('Loading links from localStorage');
    const storedLinks = localStorage.getItem('links');
    if (storedLinks) {
      setLinks(JSON.parse(storedLinks));
    }
  }, []);

  useEffect(() => {
    console.log('Saving links to localStorage');
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  const deleteLink = (index: number) => {
    // Remove the link at the given index from the links state
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  return (
    <div>
      <h1>Hello</h1>
      <AddLink onAddLink={addLink} />
      {links.map((link, index) => (
        <Link
          key={index}
          linkUrl={link.url}
          linkName={link.name}
          onDelete={() => deleteLink(index)} // Pass the deleteLink function as onDelete prop
        />
      ))}
    </div>
  );
}

export default App;
