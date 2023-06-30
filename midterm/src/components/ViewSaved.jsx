import React, { useContext, useState, useEffect } from 'react'
import './ViewSaved.css'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Context from '../assets/context';
import { useNavigate, useParams } from 'react-router-dom';
import GoBack from './GoBack';
export default function ViewSaved() {
  const { id } = useParams();
  const { user } = useContext(Context);
  const [isSaved, setIsSaved] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if(!user.isLoggedIn){
      navigate('/home')
    }
  },[])
  useEffect(() => {
    const fetchData = async () => {
      const allUsers = JSON.parse(localStorage.getItem('user'))
      const ourUser = allUsers.find((element) => String(element.email) === user.email);
      
      const foundData = ourUser.saved.find((element) => String(element.title) === id);
      setData(foundData);
    };

    fetchData();
  }, [id, user.email]);

  const isSavedHandler = () => {
    setIsSaved(!isSaved);
  };

  const handleSave = () => {
    if(!isSaved){
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
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <GoBack />
      <div id='NewsBody2'>
        <div id='NewsBodyImgSpan2'>
          <img id='NewsBodyImg2' src={data?.urlToImage} alt='' />
        </div>
        <div id='NewsBodyContent2'>
          <div id='NewsBodyContentTitleAuthor2'>
            <div>{data?.title}</div>
            <div>~by {data?.author}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: 'inherit', alignItems: 'center' }}>
            <div style={{ color: 'gray', display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon /> {data?.hoursAgo} {data?.hoursAgo === 1 ? 'hour' : 'hours'} ago
            </div>
            <div onClick={handleSave}>
              {isSaved ? <BookmarkIcon style={{ color: 'black' }} id='NewsBodySave2' /> : <BookmarkIcon id='NewsBodySave2' />}
            </div>
          </div>
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
  </>
  )
}
