import React from 'react'
import bbc from './bbc.png'
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './GoBack.css'

export default function GoBack() {
const x = useNavigate()
function handleClick(){
    x(-1)
}
 

  return (
    <header className='goBackHeader'>
        
        <nav className='goBackNav'>
         
            <ArrowBackIosNewIcon onClick={handleClick} className='ArrowBackIosNewIcon'></ArrowBackIosNewIcon>
   
            <img className="bbc2" src={bbc} alt="" />
        </nav>
    </header>
  )
}
