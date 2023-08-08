import React, { useState, useEffect } from 'react';
import Link from './Link';
import AddLink from './AddLink';
import axios from 'axios';
import ApiCaller from './ApiCaller';

const apiURL = 'https://ttmoh9fsnb.execute-api.us-east-1.amazonaws.com/dev/links';

function App() {
  const [links, setLinks] = useState<{ Name: string; URL: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL);
        const responseData = response.data;
        setLinks(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addLink = (Name: string, URL: string) => {
    console.log('Adding new link:', Name, URL);
    const newLink = { Name, URL };
    setLinks([...links, newLink]);
  };

  const deleteLink = (index: number) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  
  return (
    <div >
      <h1 className="text-3xl font-bold underline">Sunny Tali</h1>
      <AddLink onAddLink={addLink} />
      {links.map((link, index) => (
        <Link
          key={index}
          linkUrl={link.URL} // Use 'URL' instead of 'url'
          linkName={link.Name} // Use 'Name' instead of 'Name'
          onDelete={() => deleteLink(index)}
        />
      ))}
    </div>
  );
}

export default App;
