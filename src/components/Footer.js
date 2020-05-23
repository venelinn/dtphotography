import React from 'react';
import classes from './Footer.module.scss';

const Footer = ({ theme }) => (
  <footer className={classes.footer} data-theme={theme}>
    <div className={classes.copyright}>
      © {new Date().getFullYear()}, Built with Gatsby. I love you Toni !
    </div>
  </footer>
);

export default Footer;
