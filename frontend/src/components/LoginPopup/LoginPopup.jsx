import React, { useContext, useEffect, useState} from 'react'
import { StoreContext } from '../../context/StoreContext';
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {
  const {url, setToken} = useContext(StoreContext);
   
  const [currState, setCurrState] = useState("Sign Up")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({
        ...data,
      [name]: value
    }));
  }

  const onLogin = async (event) => {
    event.preventDefault();
    
    try {
      let newUrl = url;
      if(currState === "Login"){
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }

      console.log("Making request to:", newUrl);
      console.log("Request data:", data);

      const response = await axios.post(newUrl, data);
      
      console.log("Response:", response.data);

      if(response.data.success){
        console.log("Login successful, setting token and closing popup");
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false); // This should close the popup
        
        // Reset form data
        setData({
          name: "",
          email: "",
          password: ""
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  }

  // Handle clicking outside the popup to close it
  const handleBackdropClick = (event) => {
    if (event.target.classList.contains('login-popup')) {
      setShowLogin(false);
    }
  }

  return (
    <div className='login-popup' onClick={handleBackdropClick}>
      <form onSubmit={onLogin} className="login-popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img 
            onClick={() => {
              console.log("Close button clicked");
              setShowLogin(false);
            }} 
            src={assets.cross_icon} 
            alt="Close" 
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : 
            <input 
              name='name' 
              onChange={onChangeHandler} 
              value={data.name} 
              type="text" 
              placeholder='Your Name' 
              required
            />
          }
          <input 
            name='email' 
            onChange={onChangeHandler} 
            value={data.email} 
            type="email" 
            placeholder='Your Email' 
            required
          />
          <input 
            name='password' 
            onChange={onChangeHandler} 
            value={data.password} 
            type="password" 
            placeholder='Your Password' 
            required
          />
        </div>
        <button type='submit'>
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === 'Login'
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup