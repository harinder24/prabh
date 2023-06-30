import React, { useContext, useState, useEffect } from "react";
import "./Saved.css";
import NavBar from "./NavBar";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Context from '../assets/context';
import { useNavigate } from "react-router-dom";
export default function Saved() {
  const { user } = useContext(Context);
  const [saved, setSaved] = useState([]);


 
  useEffect(() => {
    if (user.isLoggedIn) {
      const allUsers = JSON.parse(localStorage.getItem('user'));
      const currentUser = allUsers.find((currentUser) => currentUser.email === user.email);

      if (currentUser) {
        const articleSaved = currentUser.saved;
        setSaved(articleSaved);
      }
    }
  }, [user.isLoggedIn, user.email]);
  
  const unSaveHandler = (title, event) => {
    event.stopPropagation();

    setSaved((prevSaved) => {
      const updatedSaved = prevSaved.filter((item) => item.title !== title);
      return updatedSaved;
    });
    const allUsers = JSON.parse(localStorage.getItem('user'));
      let currentUser = allUsers.find((currentUser) => currentUser.email === user.email);
    
      for(let i = 0; i < currentUser.saved.length;  i++){
        if(currentUser.saved[i].title == title){
          currentUser.saved.splice(i, 1)
          i--;
        }
      }
    
    const currentUserIndex = allUsers.findIndex((currentUser) => currentUser.email === user.email);

    allUsers[currentUserIndex] = currentUser;
    localStorage.setItem('user', JSON.stringify(allUsers))
    
  };
  
  return (
    <div id="SavedPage">
      <NavBar />
      <div id="SavedCardWrapperWrapper">
        {saved.map((item, i)=>{
          return <Card data={item} unSaveHandler={unSaveHandler} key={i} />
        })}
      </div>
    </div>
  );
}

function Card({data, unSaveHandler}) {
  const navigate = useNavigate();
  const goToSavedNews = () =>{

      navigate('/saved/' + data.title)
    


  }
  return (
    <div className="SavedCardWrapper" onClick={goToSavedNews}>
      <div className="SavedCard">
        <img className="SavedCard_img" src={data.urlToImage} alt="" />
      
        <div className="SavedCard_Content">
          <div className="SavedCard_Content_title">
            {data.title}
          </div>
          <div className="SavedCard__time__icon">
            <div style={{display:'flex', alignItems:'center', gap:'3px'}}>
            <div className="SavedCard__time">
              <AccessTimeIcon className="SavedCard__timeIcon" />
            </div>
            <div className="SavedCard__time">{data.hoursAgo} {data.hoursAgo === 1 ? 'hour' : 'hours'} ago</div>
            </div>
            <div onClick={(event)=>unSaveHandler(data.title, event)}>
              <BookmarkIcon className="SavedBookmarkIcon"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
