import React , {useContext, useEffect, useState}from 'react'
import './Discover.css'
import NavBar from './NavBar'
import SearchIcon from '@mui/icons-material/Search';

import Context from '../assets/context';
import SmallNewsCard from './SmallNewsCard';
import { useNavigate } from 'react-router-dom';
export default function Discover() {
  return (
    <div id='DiscoverPage'>
    <NavBar/>
    <div id='DiscoverPageMainBody'>
      <SearchBar/>
    </div>
    </div>
  )
}

function SearchBar(){
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()
  function handleNav(e){
    navigate("/view/" + e)
  }
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSelectedOption(searchQuery)
    setSearchQuery('')

  };
  const {news} = useContext(Context)
  const data= news.slice(5, 15)
  const [selectedOption, setSelectedOption] = useState('All');
  const [searchedNews, setSearchedNews] = useState([]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const options = [
    'All',
    'Football',
    'ChatGpt',
    'Google',
    'Science',
    'Vancouver',
    'Math',
    'Computer',
    'RTX',
    'Game',
    'Quantum',
    'PlayStation',
  ];
  const secret = `90b4fd2676b1494c9c7994ca8f7b3df4`;
  const getNews = async () => {
   
    const newsDataPromise = await fetch(
      `https://newsapi.org/v2/everything?q=${selectedOption}&sortBy=popularity&apiKey=${secret}`
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

    setSearchedNews(requiredData);
  };
  useEffect(()=>{
    getNews()
  },[selectedOption])

  return(
    <>
    <div id='SearchBarWrap'>
      <div id='DiscoverHeader'>
        <div>
          Discover
        </div>
        <div>
          News from all around the world
        </div>
      </div>
      <div id='DiscoverInputWrapWrap'>
      <div id='DiscoverInputWrap'>
     <SearchIcon style={{color:'gray'}}/>
      <form
       onSubmit={handleFormSubmit}
      >
      <input id='DiscoverInput'
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
       
      />
      
    </form>
    </div>
    </div>
    </div>
    <div id='DiscoverBodyContentMain'>
      <div id='cc' className="Recomendations2">
   <div style={{padding:"15px"}}>
   <div id='SelectOptions'>
   {options.map((option) => (
        <div
          key={option}
          style={{
            background: selectedOption === option ? 'black' : 'gray',
          }}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </div>
      ))}

   </div>
   <div className="cardWrapAll2">
    {searchedNews.map((item, i) =>(<SmallNewsCard onClick={() => handleNav(i+5)} key={i}  data={item} />))}
    </div>

   </div>
    
   
    
  </div>
<div id='ccc' className="Recomendations2">
   <div style={{padding:"15px"}}>
   <h4>Recomendation</h4>
   <div className="cardWrapAll2">
    {data.map((item, i) =>(<SmallNewsCard onClick={() => handleNav(i+5)} key={i}  data={item} />))}
    </div>

   </div>
    
   
    
  </div>
    </div>
    </>
  )
}

