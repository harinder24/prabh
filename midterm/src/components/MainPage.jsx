import React, { useEffect, useState, useRef, useContext } from "react";
import NavBar from "./NavBar";
import "./MainPage.css";
import Context from "../assets/context";
import SmallNewsCard from "./SmallNewsCard";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  return (
    <div id="MainPage">
      <NavBar />
      <MainPageBody />
    </div>
  );
}

function MainPageBody() {
  const { news } = useContext(Context);
  return (
    <div id="MainPageBody">
     
      {news && news.length > 0 ? (
        <BreakingNews data={news.slice(0, 5)} />
      ) : (
        <p></p>
      )}
      {news && news.length > 15 ? (
        <Recomendations data={news.slice(5, 15)}/>
      ) : (<p></p>)}
      </div>
    
  );
}

const BreakingNews = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const intervalId = useRef(null);
  const slides = useRef(null);
  const selectors = useRef(null);
  const btns = useRef(null);
  const navigate = useNavigate()
  useEffect(() => {
    setCurrentIndex(0);
    setNextIndex(1);

    slides.current = document.querySelectorAll(".slide");
    selectors.current = document.querySelectorAll(".selector");
    btns.current = document.querySelectorAll(".btn");

    slides.current[0].classList.add("active");
    selectors.current[0].classList.add("current");

    const interval = setInterval(() => cycle(), 6000);
    intervalId.current = interval;

    return () => {
      clearInterval(interval);
    };
  }, []);

  const cycle = (index) => {
    setCurrentIndex((prevIndex) => {
      const currentSlide = slides.current[prevIndex];
      const currentSelector = selectors.current[prevIndex];

      let nextIndexValue =
        index !== undefined ? index : (prevIndex + 1) % slides.current.length;
      const nextSlide = slides.current[nextIndexValue];
      const nextSelector = selectors.current[nextIndexValue];

      currentSlide.classList.remove("active");
      currentSlide.style.zIndex = "0";

      nextSlide.classList.add("active");
      nextSlide.style.zIndex = "1";

      currentSelector.classList.remove("current");
      nextSelector.classList.add("current");

      return nextIndexValue;
    });
  };

  const handleSelectorClick = (target) => {
    if (target !== currentIndex) {
      clearInterval(intervalId.current);
      cycle(target);
      const interval = setInterval(cycle, 6000);
      intervalId.current = interval;
    }
  };

  const handleButtonClick = (target) => {
    clearInterval(intervalId.current);
    if (target === "prev") {
      const targetIndex =
        currentIndex > 0 ? currentIndex - 1 : slides.current.length - 1;
      cycle(targetIndex);
    } else if (target === "next") {
      cycle();
    }
    const interval = setInterval(cycle, 6000);
    intervalId.current = interval;
  };

  function handleNav(e){
    navigate("/view/" + e)
  }

  return (
    <div id="BreakingNews" >
      <div id="container">
        <ul id="slides" onClick={() => handleNav(currentIndex)}>
          <span className="shadow_text " id="BreakingNewsLetter">
            Breaking News
          </span>
          {data.map(
            (item, index) =>
              item.urlToImage && (
                <li 
                  className={`slide ${index === currentIndex ? "active" : ""}`}
                  key={index}
                >
                  <div className="slide-partial slide-left">
                    <img src={item.urlToImage} alt={`Slide ${index}`} />
                  </div>
                  <h1 className="title">

                    <div className="shadow_text title-text">
                    <div>{item.title}</div>
        
                    </div>
                  
                   
               
                  </h1>
                  <h1 style={{top:"calc(50% + 2em)", fontSize:"0.7em"}} className="title">

                    <div className="shadow_text title-text">
                    <div>{item.source} &#9679; {item.hoursAgo} {item.hoursAgo === 1 ? 'hour' : 'hours'} ago</div>
        
                    </div>
                  
                   
               
                  </h1>
                </li>
              )
          )}
        </ul>

        <ul id="slide-select">
          <li className="btn prev" onClick={() => handleButtonClick("prev")}>
            &lt;
          </li>
          <li className="selector" onClick={() => handleSelectorClick(0)}></li>
          <li className="selector" onClick={() => handleSelectorClick(1)}></li>
          <li className="selector" onClick={() => handleSelectorClick(2)}></li>
          <li className="selector" onClick={() => handleSelectorClick(3)}></li>
          <li className="selector" onClick={() => handleSelectorClick(4)}></li>
          <li className="btn next" onClick={() => handleButtonClick("next")}>
            &gt;
          </li>
        </ul>
      </div>
    </div>
  );
};

function Recomendations({data}) {
  const navigate = useNavigate()
  function handleNav(e){
    navigate("/view/" + e)
  }
  return (<div id="Recomendations">
   <div style={{padding:"15px"}}>
   <h4>Recomendation</h4>
   <div id="cardWrapAll">
    {data.map((item, i) =>(<SmallNewsCard onClick={() => handleNav(i+5)} key={i}  data={item} />))}
    </div>

   </div>
    
   
    
  </div>)
}
