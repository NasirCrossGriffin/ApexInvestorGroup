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
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_API_LEAD_CAPTURE : "";

  function navHandler(index : string) {
    setScrollTarget(Number(index));
    navigate(`/Home`, { replace: true });
  }

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
          <a id='0' onClick={(e) => {navHandler(e.currentTarget.id)}}>Home</a>
          <a id='1' onClick={(e) => {navHandler(e.currentTarget.id)}}>Mission</a>
          <a id='2' onClick={(e) => {navHandler(e.currentTarget.id)}}>Process</a>
          <a id='3' onClick={(e) => {navHandler(e.currentTarget.id)}}>Foreclosure</a>
          <a id='4' onClick={(e) => {navHandler(e.currentTarget.id)}}>Testimonials</a>
          <a id='5' onClick={(e) => {navHandler(e.currentTarget.id)}}>Services</a>
        </div>

        <div className='FooterLogo'>
            <img src='/ApexLogo.png'/>
        </div>

        <div className='LegalProtections'>
          <p className='Operator'>This website is operated by Apex Investments And Acquisitions</p>
        
          <span className='Divider'></span>

          <div className='LegalNav'>
            <a href='/privacy-policy'>Privacy Policy</a>
            <a href='/terms-of-use'>Terms Of Use</a>
            <a href='/real-estate-disclaimer'>Real Estate Disclaimer</a>
            <a href='/accessibility'>Accessibility</a>
            <a href='/contact'>Contact</a>
          </div>

          <span className='Divider'></span>

          <div className='LegalDisclaimers'>
            <span><span>No legal, financial, tax, or foreclosure advice: </span>Information on this website is for general informational purposes only. Submitting a form does not create an attorney-client, financial advisor, lender, broker-client, or agency relationship unless separately agreed in writing.</span>
            <span><span>No guarantee of outcome: </span>We do not guarantee that any property will sell, that foreclosure can be stopped, that a cash offer will be made, or that any specific result will occur.</span>
            <span><span>Information accuracy: </span>Property, foreclosure, loan, and contact information submitted through this site is provided by the user and may require independent verification.</span>
            <span><span>Privacy notice: </span>By submitting information, you consent to being contacted by phone, email, or text regarding your inquiry. Message/data rates may apply. You may opt out of non-essential communications at any time.</span>
            <span><span>Third-party services: </span>This site may use third-party hosting, email, analytics, storage, CRM, or automation providers to process inquiries and operate the service.</span>
          </div>

          <span className='Divider'></span>

          <p className='Rights'>© 2026 Apex Investments & Acquisitions. All rights reserved. Website powered by Griffin Managed Web Solutions.</p>
        </div>
      </div>

      
    );
}

export default Footer;


