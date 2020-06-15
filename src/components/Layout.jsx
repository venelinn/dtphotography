import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Header from './Header';
import Footer from './Footer';
import GlobalStyle from '../styles/global';
import Transition from './Transition'
import OptionsContext from './OptionsContext'

import '../styles/style.scss';

const Skip = styled.a`
  padding: 0 1rem;
  line-height: 60px;
  background: #2867cf;
  color: white;
  z-index: 101;
  position: fixed;
  top: -100%;
  &:hover {
    text-decoration: underline;
  }
  &:focus,
  &:active,
  &:hover {
    top: 0;
  }
`

const ThemeClassOnBody = ({bodyClass}) => {
  // const [theme] = useTheme();
  const theme = 'dark';
  return (
    <Helmet>
      <body data-theme={theme} className={`page page--${bodyClass}`} />
    </Helmet>
  );
};

const Layout = props => {
  function handleFirstTab(e) {
    if (e.keyCode === 9) {
      document.body.classList.add('user-is-tabbing')
    }
  }
  useEffect(() => window.addEventListener('keydown', handleFirstTab), [])
  return (
    <>
      <GlobalStyle />
      <ThemeClassOnBody bodyClass={props.bodyClass} />
      <Skip href="#main" id="skip-navigation">
        Skip to content
      </Skip>
      <Header />
      <Transition {...props}>
        <main id="main">
          { props.children }
        </main>
        <Footer />
      </Transition>
    </>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
