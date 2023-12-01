import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet'
import { DataProvider } from '../utils/DataProvider'
import Header from './Header/Header';
import Footer from './Footer/Footer';
import GlobalStyle from '../styles/global';
import Transition from './Transition'

import '../styles/style.scss';

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
      <DataProvider>
        <a href="#main" id="skip-navigation">
          Skip to content
        </a>
        <Header location={props.location} />
        <Transition {...props}>
          <main id="main">
            { props.children }
          </main>
          <Footer />
        </Transition>
      </DataProvider>
    </>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
