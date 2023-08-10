import React, { useState, useEffect } from 'react';
import Link from './Link';
import AddLink from './AddLink';
import axios from 'axios';
import ApiCaller from './ApiCaller';
import EditButton from './EditButton'; 

const apiURL = 'https://ttmoh9fsnb.execute-api.us-east-1.amazonaws.com/dev/links';

function App() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

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

  const addLink = (name, url) => {
    const newLink = { Name: name, URL: url };
    setLinks([...links, newLink]);
  };

  const deleteLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    console.log(editMode);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-zinc-700 min-h-screen p-8">
      <EditButton onToggle={toggleEditMode}/>
      <h1 className="flex text-white justify-center text-3xl font-sm mb-4">LinkTree Clone</h1>

      { editMode &&<AddLink onAddLink={addLink} />}
      <div className="mt-4 space-y-2">
        {links.map((link, index) => (
          <Link
            key={index}
            linkUrl={link.URL}
            linkName={link.Name}
            onDelete={() => deleteLink(index)}
            editMode={editMode}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
