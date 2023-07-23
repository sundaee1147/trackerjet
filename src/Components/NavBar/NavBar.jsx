// NavBar.js
import React from 'react';
import './NavBar.css'
import logo from '../../Assets/logo-trackerjet.png'




const NavBar = () => {
    

        return (
            <div>
            <nav>
                <ul className='NavBar'>
                <img style={{height:"150px", width:"150px"}} src={logo} alt='Tracker-Jet'></img>
                {/* <h2 style={{color:"goldenrod"}}>TRACKER JET</h2> */}
                </ul>
            </nav>
            </div>
        );
};

export default NavBar;
