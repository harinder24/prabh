
import React, { useContext, useState, useEffect } from 'react';
import GoBack from './GoBack';
import './NewsView.css';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Context from '../assets/context';
import { useNavigate, useParams } from 'react-router-dom';
import PopUp from './PopUp';

export default function NewsView() {
  const { id } = useParams();
  const { news, user } = useContext(Context);
  const [data, setData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const navigate = useNavigate();

  const isSavedHandler = () => {
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    const fetchData = async () => {
      const foundData = news.find((element) => String(element.id) === id);
      setData(foundData);
    };

    fetchData();
  }, [id, news]);

  useEffect(() => {
    if (user.isLoggedIn && data) {
      const allUsers = JSON.parse(localStorage.getItem('user'));
      const currentUser = allUsers.find((currentUser) => currentUser.email === user.email);

      if (currentUser) {
        const isArticleSaved = currentUser.saved.some((savedArticle) => savedArticle.title === data.title);
        setIsSaved(isArticleSaved);
      }
    }
  }, [user.isLoggedIn, user.email, data]);

  const handleSave = () => {
    if (!user.isLoggedIn) {
      SaveIconPopUpHandler();
    } else {
      if (!isSaved) {
        const allUsers = JSON.parse(localStorage.getItem('user'));
        const currentUserIndex = allUsers.findIndex((currentUser) => currentUser.email === user.email);

        if (currentUserIndex !== -1) {
          allUsers[currentUserIndex].saved.push(data);
          localStorage.setItem('user', JSON.stringify(allUsers));
          isSavedHandler();
        }
      } else {
        const allUsers = JSON.parse(localStorage.getItem('user'));
        const currentUserIndex = allUsers.findIndex((currentUser) => currentUser.email === user.email);

        if (currentUserIndex !== -1) {
          const savedArticleIndex = allUsers[currentUserIndex].saved.findIndex((savedArticle) => savedArticle.title === data.title);
          if (savedArticleIndex !== -1) {
            allUsers[currentUserIndex].saved.splice(savedArticleIndex, 1);
            localStorage.setItem('user', JSON.stringify(allUsers));
            isSavedHandler();
          }
        }
      }
    }
  };

  function closePopUp() {
    setPopUpVisible(false);
  }

  const handlePopUp = () => {
    navigate('/login');
  }

  const SaveIconPopUpHandler = () => {
    setPopUpVisible(true);
  };

  if (!data) {
    return <div></div>;
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
        {isPopUpVisible ? (
          <PopUp css={{ display: 'flex' }} closePopUp={closePopUp} handlePopUp={handlePopUp} link="Log in" />
        ) : (
          <div></div>
        )}
        <GoBack />
        <div id='NewsBody'>
          <div id='NewsBodyImgSpan'>
            <img id='NewsBodyImg' src={data.urlToImage} alt='' />
          </div>
          <div id='NewsBodyContent'>
            <div id='NewsBodyContentTitleAuthor'>
              <div>{data.title}</div>
              <div>~by {data.author}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: 'inherit', alignItems: 'center' }}>
              <div style={{ color: 'gray', display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon /> {data.hoursAgo} {data.hoursAgo === 1 ? 'hour' : 'hours'} ago
              </div>
              <div onClick={handleSave}>
                {isSaved ? <BookmarkIcon style={{ color: 'black' }} id='NewsBodySave' /> : <BookmarkIcon id='NewsBodySave' />}
              </div>
            </div>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
