import React, { useState, useEffect } from 'react';
import Link from './Link';
import AddLink from './AddLink';
import axios from "axios";

function App() {
  const [links, setLinks] = useState<{ name: string; url: string }[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://ttmoh9fsnb.execute-api.us-east-1.amazonaws.com/dev'
      );

      // Assuming the response data is an array of items
      const items = response.data;

      // Print the contents of the body to the console
      console.log(items);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addLink = (name: string, url: string) => {
    const newLink = { name, url };
    setLinks([...links, newLink]);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
