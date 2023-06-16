import React from 'react'
import { useContext } from 'react';
import PhotoContext from './photoContext';
import './PhotoList.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from '@mui/material';
export default function PhotoList() {
const { photosData } = useContext(PhotoContext);
  return (
    <div className="photo_wrapper">
      <nav><Link>Favourite</Link></nav>
      {photosData.map((data) => {
        return <PhotoCard key={data.id} data={data} />;
      })}
    </div>
  )
}

function PhotoCard({data}) {
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
        // style={{
        //   background: data.isFavorite ? `red` : `#fff`,
        //   boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        //   padding: '2px',
        // }}
        className='photo_card'
      >
        
        {/* <button onClick={handleAddFav}>
          {data.isFavorite ? `Remove From Fav` : `Add to Fav`}
        </button> */}
        <div style={{position: 'relative'}}>
        <img className='photo_img' src={data.image} />
        <FavoriteIcon onClick={handleAddFav} style={{color: data.isFavorite ? `red` : `#e2e2e2ee`, position:"absolute", top: "0", right:'2'}}></FavoriteIcon>
        </div>
        
        <p>{data.description}</p>
        
      </div>
    );
  
}

