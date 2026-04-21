import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './styles/Footer.css';

function Footer({
    setScrollTarget
}: {
    setScrollTarget : React.Dispatch<React.SetStateAction<number>>
}) {

    const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_API_LEAD_CAPTURE : "";


  return (
    <div className='Footer'>
        <div className='FooterHeading'>
          <span>Let Us Help You Reach Your Apex</span>
        </div>

        <div className='ApexContact'>
          <div className='Contact'>
            <h1>Based In</h1>
            <h2>Marlton NJ</h2>
          </div>

          <div className='Contact'>
            <h1>Email Us</h1>
            <h2>info@apexinvestorgroup.com</h2>
          </div>

          <div className='Contact'>
            <h1>Call Us</h1>
            <h2>+1 (856) 452-8656</h2>
          </div>
        </div>

        <div className='FooterNav'>
          <a onClick={() => {setScrollTarget(0)}}>Home</a>
          <a onClick={() => {setScrollTarget(1)}}>Mission</a>
          <a onClick={() => {setScrollTarget(2)}}>Process</a>
          <a onClick={() => {setScrollTarget(3)}}>Foreclosure</a>
          <a onClick={() => {setScrollTarget(4)}}>Testimonials</a>
          <a onClick={() => {setScrollTarget(5)}}>Services</a>
          <a onClick={() => {window.open(`${BASE_URL}/lead/admin`, '_blank')}}>Portal</a>
        </div>

        <div className='SocialsNav'>
          <a>Facebook</a>
          <a>Instagram</a>
          <a>YouTube</a>
          <a>LinkendIn</a>
        </div>

        <div className='FooterLogo'>
            <img src='/ApexLogo.png'/>
        </div>
      </div>
    );
}

export default Footer;


