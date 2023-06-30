

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import MainPage from "./components/MainPage";
import Context from "./assets/context.js";
import NewsView from "./components/NewsView";
import Discover from "./components/Discover";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Saved from "./components/Saved";
import ViewSaved from "./components/ViewSaved";
function App() {
  const secret = `90b4fd2676b1494c9c7994ca8f7b3df4`;
  const [news, setNews] = useState([]); 
  const [user, setUser] = useState({ isLoggedIn: false, email: '' });

  const handleLogin = (email) => {

    setUser({ isLoggedIn: true, email });
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false, email: '' });
  };
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate() - 1).padStart(2, "0");

  const todayDate = year + "-" + month + "-" + day;
  const getNews = async () => {
   
    const newsDataPromise = await fetch(
      `https://newsapi.org/v2/everything?q=canada&${todayDate}&sortBy=popularity&apiKey=${secret}`
    );
    const newsData = await newsDataPromise.json();

    const newsDataArticle = newsData.articles;

    const filteredArray = newsDataArticle.filter(
      (obj) =>
        obj.description &&
        obj.urlToImage &&
        obj.title &&
        obj.author &&
        obj.publishedAt &&
        obj.source.name
    );

    const requiredData = filteredArray.map((data, i) => {
      return {
        author: data.author,
        description: data.description,
        publishedAt: data.publishedAt,
        source: data.source.name,
        title: data.title,
        url: data.url,
        urlToImage: data.urlToImage,
        isSaved: false,
        hoursAgo: Math.floor(Math.random() * 23),
        id: i
      };
    });

    setNews(requiredData);
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <Context.Provider value={{ news, setNews,user,
      handleLogin,
      handleLogout, }}>
      <BrowserRouter>
      <Routes>
        
      <Route path="/home" element={<MainPage/>} />
      <Route path="/discover" element={<Discover/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/saved" element={<Saved/>} />
      <Route path="/saved/:id" element={<ViewSaved/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/view/:id" element={<NewsView/>} />
      <Route path="/"  element={<Navigate to="/home"/>}/>
      </Routes>
      </BrowserRouter>

    </Context.Provider>
  );
}

export default App;
