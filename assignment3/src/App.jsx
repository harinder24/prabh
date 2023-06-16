import { useEffect, useState } from 'react';
import './App.css'
import PhotoList from './PhotoList';
import PhotoContext from './photoContext';
function App() {
  const secret = `9Ux7_YQRfMyBDYtKwwk1_O_26JWCJvQgMEg7RQoyhFE`

  const [photosData, setPhotosData] = useState([]);

  useEffect(() => {
    getPhotosFromSplash();
  }, []);

  const getPhotosFromSplash = async () => {
    const photoDataPromise = await fetch(
      `https://api.unsplash.com/photos/?client_id=${secret}`
    );
    const photoJsonData = await photoDataPromise.json();

    const requiredData = photoJsonData.map((data) => {
      return {
        image: data.urls.full,
        description: data.alt_description,
        isFavorite: false,
        id: data.id,
      };
    });
    setPhotosData(requiredData);
  };
  return (

  <PhotoContext.Provider
      value={{
        photosData,
        setPhotosData,
      }}
    >
      <PhotoList />
    </PhotoContext.Provider>

  )
}

export default App
