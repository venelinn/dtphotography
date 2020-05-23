import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet'
import Header from './Header';
//import Footer from './Footer';
import GlobalStyle from '../styles/global';

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

const Layout = ({children, bodyClass}) => {
  return (
    <>
      <GlobalStyle />
        <ThemeClassOnBody bodyClass={bodyClass} />
       <Header />
       {/* <Footer /> */}
      { children }
    </>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
