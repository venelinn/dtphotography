import React, {useState, useEffect, useRef } from 'react';
import { useData } from '../../utils/DataProvider'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Section from '../Section/Section';
import Nav from './Nav';
import Logo from './Logo'
import Social from './Social';

import './header.scss';

const Header = ({location}) => {
  const [state, setState] = useData();
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )


  const locRef = useRef({
    location: null
  })

  const [menuState, setMenuState] = useState({
    initial: false,
    clicked: null,
  });

  const [disabled, setDisabled] = useState(false);

  const openMenu = (action) => {
    setState({ ...state, isMenuOpen: action});
  }

  //toggle menu
  const handleMenu = () => {
    disableMenu();
    if (menuState.initial === false) {
      setMenuState({
        initial: null,
        clicked: true,
      });
      openMenu(!state.isMenuOpen)
    } else if (menuState.clicked === true) {
      setMenuState({
        clicked: !menuState.clicked
      });
      openMenu(!state.isMenuOpen)
    } else if (menuState.clicked === false) {
      setMenuState({
        clicked: !menuState.clicked
      });
      openMenu(!state.isMenuOpen)
    }
  };

  // check if out button is disabled
  const disableMenu = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  useEffect(() => {
    // set the location on initial load
    if (!locRef.current.location) {
      locRef.current.location = location
    }
    // make sure overlay is closed on route change
    else if (locRef.current.location !== location) {
      setMenuState({ clicked: false});
      locRef.current.location = location
    }
  }, [location])


  return (
    <Section className="header">
      <header className={`header menu--${menuState.clicked ? 'on' : 'off'}`} ref={locRef}>
        <div className="header__left">
          <div className={`menu--${menuState.clicked ? 'on' : 'off'}`}>
            <div className="top-nav__icon">
              <button
                className="burger"
                onClick={handleMenu}
                aria-label="Menu"
                aria-controls="navigation"
                >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <Nav />
          </div>
        </div>
        <div className="header__center logo">
          <Link to="/"><Logo /><span className="sr-only">{site.siteMetadata.title}</span></Link>
        </div>
        <div className="header__right">
          <Social />
        </div>
      </header>
    </Section>
  );
};

export default Header;
