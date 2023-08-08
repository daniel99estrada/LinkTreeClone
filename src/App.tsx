import React, { useState, useEffect } from 'react';
import Link from './Link';
import AddLink from './AddLink';
import axios from 'axios';
import ApiCaller from './ApiCaller';

const apiUrl = 'https://ttmoh9fsnb.execute-api.us-east-1.amazonaws.com/dev/links';

function App() {
  const [links, setLinks] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Make the API call and get the response data
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        // Assuming the response data is an array of objects as shown in your example
        const responseData = response.data;
        setLinks([...links, responseData]);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // This useEffect will run whenever the 'links' state is updated
    console.log('Updated links:', links);
  }, [links]); // The second argument is the dependency array with 'links'

  const addLink = (name: string, url: string) => {
    const newLink = { name, url };
    setLinks([...links, newLink]);
  };

  const deleteLink = (index: number) => {
    // Remove the link at the given index from the links state
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  return (
    <div>
      <h1>Demo</h1>
      <ApiCaller />
      <AddLink onAddLink={addLink} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        links.map((link, index) => (
          <Link
            key={index}
            linkUrl={link.url}
            linkName={link.name}
            onDelete={() => deleteLink(index)} // Pass the deleteLink function as onDelete prop
          />
        ))
      )}
    </div>
  );
}

export default App;
