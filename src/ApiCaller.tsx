import React, { useEffect, useState } from 'react';

const apiUrl = 'https://ttmoh9fsnb.execute-api.us-east-1.amazonaws.com/dev/links';

const ApiCaller: React.FC = () => {
  const [responseData, setResponseData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setResponseData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {responseData ? (
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
      ) : (
        <div>No data received</div>
      )}
    </div>
  );
};

export default ApiCaller;
