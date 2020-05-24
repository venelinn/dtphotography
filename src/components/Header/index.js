import React, {useState} from 'react';
import Link from 'gatsby-link'
import Section from '../Section';
import Nav from './Nav';
import Logo from './Logo'
import Social from './Social';
import { useSpring } from "react-spring";
//import { useCurrentWidth } from '../../hooks/use-width'

import './header.scss';

const Header = () => {

  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useSpring({
    transform: menuVisible ? `translateY(0)` : `translateY(-100%)`,
    opacity: menuVisible ? 1 : 0
  });

  const openOverlay = () => {
    setMenuVisible(!menuVisible)
  };

  return (
    <Section>
      <header className='header'>
        <div className="header__left">
          <div className={`menu--${menuVisible ? 'on' : 'off'}`}>
            <div className="top-nav__icon">
              <button
                className="burger"
                onClick={() => openOverlay()}
                aria-label="Menu"
                aria-controls="navigation"
                >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <Nav/>
          </div>
        </div>
        <div className="header__center logo">
          <Link to="/"><Logo /></Link>
        </div>
        <div className="header__right">
          <Social />
        </div>
      </header>
    </Section>
  );
};

export default Header;
