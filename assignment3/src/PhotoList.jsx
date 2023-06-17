import React from 'react'
import { useContext } from 'react';
import PhotoContext from './photoContext';
import './PhotoList.css'
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function PhotoList() {
const { photosData } = useContext(PhotoContext);
  return (
    <div className="photo_wrapper">
      <nav id='nav'><Link to={'/favorite'}>Favourite</Link></nav>
      {photosData.map((data) => {
        return <PhotoCard key={data.id} data={data} />;
      })}
    </div>
  )
}

export function PhotoCard({data}) {
    const { setPhotosData, photosData } = useContext(PhotoContext);

    const handleAddFav = () => {
      const photosListAfterFav = photosData.map((photoObject) => {
        if (photoObject.id === data.id) {
          photoObject.isFavorite = !photoObject.isFavorite;
        }
        return photoObject;
      });
      setPhotosData(photosListAfterFav);
    };
  
    return (
      <div
    
        className='photo_card'
      >
        <div style={{position: 'relative'}}>
        <img className='photo_img' src={data.image} />
        <FavoriteIcon onClick={handleAddFav} style={{color: data.isFavorite ? `red` : `#e2e2e2ee`, position:"absolute", top: "0", right:'2', cursor: "pointer"}}></FavoriteIcon>
        </div>
        
        <p>{data.description}</p>
        
      </div>
    );
  
}

