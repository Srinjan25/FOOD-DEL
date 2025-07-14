import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
       <div className="footer-conntent">     
       <div className="footer-content-right">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium totam molestias, laboriosam, tenetur sequi porro sit laborum dicta, natus voluptatem voluptas laudantium officia earum ab incidunt quos facere similique! Ipsam reprehenderit nemo quos magnam.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                </div>      
       </div>
       <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>Aout Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
       </div>
       <div className="footer-content-left">
           <h2>GET IN TOUCH</h2>
           <ul>
            <li>+1-222-456-7890</li>
            <li>contact#tomato.com</li>
           </ul>
       </div>
       </div>
       <hr />
       <p className="footer-copyright">Copyright 2025 Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
