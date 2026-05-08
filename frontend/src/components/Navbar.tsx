import './styles/Navbar.css'
import './styles/Navbar-Mobile.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar(
    {
        setScrollTarget,
        setSearchQuery,
        isScrollingUp,
        passedFirstScreen
    } 
    : 
    {
        setScrollTarget : React.Dispatch<React.SetStateAction<number>>
        setSearchQuery : React.Dispatch<React.SetStateAction<string>>
        passedFirstScreen : boolean
        isScrollingUp : boolean
    }
) {
    const navigate = useNavigate();

    const [navDrawer, setNavDrawer] = useState<boolean>(false);

    const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_API_LEAD_CAPTURE_DEV : import.meta.env.VITE_API_LEAD_CAPTURE_PROD;

    const navLinks = [{
        navLink : "Home",
    }, {
        navLink : "Mission",
    }, {
        navLink : "Process",
    }, {
        navLink : "Foreclosure",
    }, {
        navLink : "Testimonials",
    }, {
        navLink : "Services",
    }]

    const handleNavigation = (index : number) => {
        navigate(`/Home`, { replace: true });
        setScrollTarget(index);
    }
 
  return (
    <>
        <div className={"Navbar ".concat(isScrollingUp ? "NavRevealed" : "NavHidden")}>
            <div className={'NavBackground '.concat(passedFirstScreen ? "WithBackground" : "NoBackground")}></div>
            <div className='NavContent'>
                <div className='NavLogo'><img src='/ApexLogo.png'/></div>
                <div className='Navigation'>
                    {navLinks.map((link, index) => (
                        <div className='NavLink'><button onClick={index !== 6 ? () => {handleNavigation(index)} : () => {window.open(`${BASE_URL}/lead/admin`, '_blank')}}><h3>{link.navLink}</h3></button></div>
                    ))}
                </div>
                <button className='NavContact' onClick={() => {window.open(`${BASE_URL}/lead`, '_blank')}}>Contact</button>
                <a className='NavDrawerToggle' onClick={() => setNavDrawer(!navDrawer)}>
                    <span />
                    <span />
                    <span />
                </a>
            </div>
        </div>

        {navDrawer ? <div className='NavDrawer'>
            <div className='NavDrawerBackground' onClick={() => setNavDrawer(!navDrawer)}></div>
            <div className='DrawerContainer'>
                <div className='Drawer RevealDrawer'>
                    {navLinks.map((link, index) => (
                        <div className='NavLink'><button onClick={index !== 6 ? () => {handleNavigation(index)} : () => {window.open(`${BASE_URL}/lead`, '_blank')}}><h3>{link.navLink}</h3></button></div>
                    ))}
                </div>
            </div>
        </div> : null}
    </>
  )
}

export default Navbar;
