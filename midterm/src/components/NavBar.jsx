import React, { useState, useEffect, useContext } from "react";
import "./NavBar.css";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import bbc from "./bbc.png";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
import Context from "../assets/context";


export default function NavBar() {
  const { id } = useParams();
  const [activeIcon, setActiveIcon] = useState(null);
  const location = useLocation();
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const { user,  handleLogout} = useContext(Context);
  const navigate = useNavigate()
  
  const ProfileHandler = () => {
    setPopUpVisible(true);
  };
  function closePopUp() {
    setPopUpVisible(false);
  }
  const handleIconClick = (iconId) => {
    setActiveIcon(iconId);
  };

  useEffect(() => {
    if (id) {
      setActiveIcon(id);
    }
  }, [id]);

  useEffect(() => {
    const pathname = location.pathname;
    const iconId = pathname.substring(1);
    setActiveIcon(iconId || "home");
  }, [location]);

  const handlePopUp = () =>{
    if(user.isLoggedIn){
      handleLogout()
      navigate('/login')
    }else{
      navigate('/login')
    }
  }
  return (
    <>
      {isPopUpVisible ? (
        <PopUp css={{ display: "flex" }} closePopUp={closePopUp} handlePopUp={handlePopUp} link={user.isLoggedIn ? 'Log out' : "Log in"}/>
      ) : (<div></div>)}

      <header id="mainHeader">
        <nav id="mainNav">
          <img className="bbc" src={bbc} alt="" />
          <div id="HeaderOptionDiv">
            <Link to={"/home"}>
              <HeaderOption
                Icon={HomeIcon}
                title="Home"
                active={activeIcon === "home"}
                onClick={() => handleIconClick("home")}
              />
            </Link>
            <Link to={"/discover"}>
              <HeaderOption
                Icon={SearchIcon}
                title="Discover"
                active={activeIcon === "discover"}
                onClick={() => handleIconClick("discover")}
              />
            </Link>
            <Link to="/saved">
              <HeaderOption
                Icon={BookmarkIcon}
                title="Bookmark"
                active={activeIcon === "saved"}
                onClick={() => handleIconClick("saved")}
              />
            </Link>

            <HeaderOption
              Icon={PersonIcon}
              title="Profile"
              active={activeIcon === "profile"}
              onClick={ProfileHandler}
            />
          </div>
        </nav>
      </header>
    </>
  );
}
