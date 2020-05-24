import React from 'react';
import Section from './Section';
import classes from './Footer.module.scss';

const Footer = ({ theme }) => (
  <Section>
  <footer className={classes.footer} data-theme={theme}>
    <div className={classes.copyright}>
      © {new Date().getFullYear()}, Built with Gatsby. I love you Toni !
    </div>
  </footer>
  </Section>
);

export default Footer;
