import React from 'react'
import './PopUp.css'
import CloseIcon from '@mui/icons-material/Close';
export default function PopUp({css, closePopUp, link, handlePopUp}) {
  return (
    <div style={css} id="popUp">
        <div id='popUpBox'>
            <div style={{padding:'10px'}}>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <span onClick={closePopUp}>
                <CloseIcon  id="CloseIcon"/>
                </span>
                </div>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'110px'}}>
                    <div id='popUpBoxBtn' onClick={handlePopUp}>
                        {link}
                    </div>
                </div>


            </div>
           
        </div>
    </div>
  )
}
