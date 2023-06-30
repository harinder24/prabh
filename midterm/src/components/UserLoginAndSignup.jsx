import React, {useContext, useState} from 'react'
import './UserLoginAndSignup.css'
import { useNavigate } from 'react-router-dom';
import bbc from './bbc.png'
import Context from "../assets/context";
export function Header({btnType, navigateTo}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(navigateTo);
    }
  return (
    <>
    <div className='loginAndSigHeader'>
        <div id='loginAndSigHeaderNav'>
        <div>
            <img className='bbc3' src={bbc} alt="BBC" />
        </div>
        {btnType && <div className='loginAndSigHeader__lastDiv'>
        <div onClick={handleClick}>
                {btnType}
            </div>
        </div>}
        </div>
    </div>
    


    
    </>
  )
}
export function MainContentUserSignUpLogin({ btnType }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const {handleLogin} = useContext(Context)
    const navigate = useNavigate()
    const handleSubmit = (event) => {
      event.preventDefault();
      const userEmail = document.getElementById("userEmail");
      const userPassword = document.getElementById("userPassword");
      const userEmailLabel = document.getElementById("userEmailLabel");
      const userPasswordLabel = document.getElementById("userPasswordLabel");
      if (!email) {
        setEmailError("Please enter your email address.");
        userEmail.style.borderColor = "#cf0007";
        userEmailLabel.style.color = "#cf0007";
        return;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError("Please enter a valid email address.");
        userEmail.style.borderColor = "#cf0007";
        userEmailLabel.style.color = "#cf0007";
        return;
      } else {
        userEmail.style.borderColor = "#808080";
        userEmailLabel.style.color = "#000000";
        setEmailError("");
      }
  
      if (!password) {
        setPasswordError("Please enter your password.");
        userPassword.style.borderColor = "#cf0007";
        userPasswordLabel.style.color = "#cf0007";
        return;
      } else if (password.length < 6) {
        setPasswordError("Please enter a password with at least 6 characters.");
        userPassword.style.borderColor = "#cf0007";
        userPasswordLabel.style.color = "#cf0007";
        return;
      } else {
        userPasswordLabel.style.color = "#000000";
        userPassword.style.borderColor = "#808080";
        setPasswordError("");
      }

      if(btnType === "Sign Up"){
        if(!localStorage.getItem("user")){
            localStorage.setItem("user", JSON.stringify([]))
        }
        let users = JSON.parse(localStorage.getItem("user"))
        for(let i = 0; i < users.length; i++){
            if(email == users[i].email){
                setPasswordError("User with email already exists");
                return;
            }
        }
        users.push({email: email, password: password, saved: []})
        localStorage.removeItem("user")
        localStorage.setItem("user", JSON.stringify(users))
        handleLogin(email)
        navigate("/home")

      }else if(btnType === "Log In"){
        if(!localStorage.getItem("user")){
            setPasswordError("No user exist with this email");
            return;
        }
        let users = JSON.parse(localStorage.getItem("user"))
        for(let i = 0; i < users.length; i++){
            if(email == users[i].email){
                if(password == users[i].password){
                    handleLogin(email)
                    navigate("/home")
                }
                setPasswordError("Wrong password");
        return;
            }
        }
        setPasswordError("No user exist with this email");
        return;
      }

  
    }
    return (
        <div id='MainContentSignInLoginIn'>
        <form
          className="LoginAndSigninPageDivLeftContent"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="LoginAndSigninPageDivLeftContent__h2">
            {btnType}
          </h2>
          <div>
            <label htmlFor="userEmail" id="userEmailLabel">
              <h3>Email</h3>
            </label>
            <input
              autoFocus
              autoComplete="email"
              id="userEmail"
              className="LoginAndSigninPageDivLeftContent__input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            {emailError && <div className="FormErrorMessage">{emailError}</div>}
            <label htmlFor="userPassword" id="userPasswordLabel">
              <h3>Password</h3>
            </label>
            <input
              id="userPassword"
              className="LoginAndSigninPageDivLeftContent__input"
              type="password"
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {passwordError && (
              <div className="FormErrorMessage">{passwordError}</div>
            )}
          </div>
          <button
            type="submit"
            className="LoginAndSigninPageDivLeftContent__button"
          >
            {btnType}
          </button>
        </form>
        </div>
      );
    }