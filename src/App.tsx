import React, { useState, useEffect } from 'react';
import Link from './Link';
import AddLink from './AddLink';
import axios from 'axios';
import ApiCaller from './ApiCaller';
import EditButton from './EditButton'; 

const apiURL = 'https://ttmoh9fsnb.execute-api.us-east-1.amazonaws.com/dev/links';
const postApiURL = "https://ttmoh9fsnb.execute-api.us-east-1.amazonaws.com/dev/post-link";
const deleteApiURL = "https://ttmoh9fsnb.execute-api.us-east-1.amazonaws.com/dev/delete";

function App() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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

  const addLink = (name, url) => {
    const newLink = { Name: name, URL: url };
    setLinks([...links, newLink]);
    postNewLink(newLink);
  };

  const postNewLink = async (linkData) => {
    try {
      await axios.post(postApiURL, linkData);
    } catch (error) {
      console.error('Error posting new link:', error);
    }
  };
  
  const deleteLink = (index) => {
    const updatedLinks = [...links];
    const deletedLink = links[index];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
    
    try {
      axios.delete(deleteApiURL, {
        data: deletedLink // Pass the deletedLink as the request body
      });
    } catch (error) {
      console.error('Error deleting link:', error);
    }
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
