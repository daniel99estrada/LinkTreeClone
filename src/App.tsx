import { useState, useEffect } from 'react'; // Import React and other required hooks
import Link from './Link';
import AddLink from './AddLink';
import axios from 'axios';
import EditButton from './EditButton'; 

const apiURL = 'https://ttmoh9fsnb.execute-api.us-east-1.amazonaws.com/dev/links';
const postApiURL = "https://ttmoh9fsnb.execute-api.us-east-1.amazonaws.com/dev/post-link";
const deleteApiURL = "https://ttmoh9fsnb.execute-api.us-east-1.amazonaws.com/dev/delete";

function App() {
  const [links, setLinks] = useState<Link[]>([]); // Explicitly specify type for links state
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get(apiURL);
      const responseData = response.data;
      setLinks(responseData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addLink = (name: string, url: string): void => {
    const newLink = { Name: name, URL: url };
    setLinks([...links, newLink]);
    postNewLink(newLink);
  };

  const postNewLink = async (linkData: Link): Promise<void> => {
    try {
      await axios.post(postApiURL, linkData);
    } catch (error) {
      console.error('Error posting new link:', error);
    }
  };

  const deleteLink = async (index: number): Promise<void> => {
    try {
      const deletedLink = links[index];
      const response = await fetch(deleteApiURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: deletedLink.Name,
        }),
      });
  
      if (response.ok) {
        // If the delete operation was successful, update your links state
        const updatedLinks = links.filter((_, i) => i !== index);
        setLinks(updatedLinks);
      } else {
        // Handle errors if the delete operation fails
        console.error('Failed to delete link');
      }
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };
  
  const toggleEditMode = (): void => {
    setEditMode(!editMode);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-zinc-700 min-h-screen p-8">
      <EditButton onToggle={toggleEditMode}/>
      <h1 className="text-white text-3xl font-semibold text-center mb-4">LinkTree Clone</h1>
  
      <div className="mx-auto max-w-4xl">
        {editMode && <AddLink onAddLink={addLink} />}
        <div className="mt-4 space-y-4">
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
    </div>
  );
}

export default App;
