import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { Loader } from './Loader';
import { PhotoFrame } from './PhotoFrame';
const App = () => {
  const [id, setId] = useState('');
  const [photoData, setPhotoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

   const handleInputChange = (e) => {
    setId(e.target.value);
  };

  useEffect(() => {
    if (!id) {
      setPhotoData(null);
      return;
    }

    setIsLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotoData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching photo data:', error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div>
      <input
        type="number"
        placeholder="Enter a number between 1-5000"
        value={id}
        onChange={handleInputChange}
      />
      {isLoading ? (
        <Loader />
      ) : (
        photoData && (
          <PhotoFrame url={photoData.url} title={photoData.title} />
        )
      )}
    </div>

  
}


export default App;
