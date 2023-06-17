import React, { useEffect , useState} from 'react'
import { useContext } from 'react';
import PhotoContext from './photoContext';
import './PhotoList.css'
import { PhotoCard } from './PhotoList';
import { Link } from 'react-router-dom';

export default function Favourite() {
    const { photosData } = useContext(PhotoContext);
    const [favorite, setFavorite] = useState([])
    useEffect(()=>{
      const filterData = photosData.filter((data)=>{
        return data.isFavorite === true ;
      })
      setFavorite(filterData)
    },[photosData])
 
  return (
    <div className="photo_wrapper">
      <nav id='nav'><Link to={'/'}>Home</Link></nav>
      {favorite.map((data) => {
        if( data.isFavorite === true){
            return <PhotoCard key={data.id} data={data} />;
        }       
      })}
    </div>
  )
}
