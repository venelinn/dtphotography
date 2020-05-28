import React from 'react';
import { graphql, useStaticQuery } from 'gatsby'
import Section from './Section';
import classes from './Footer.module.scss';

const query = graphql`
  query footerData {
    data: contentfulFooter {
      copy
    }
  }
`

const Footer = ({ theme }) => {
  const footer = useStaticQuery(query)
  return (
    <Section>
    <footer className={classes.footer} data-theme={theme}>
      <div className={classes.copyright}>
        © {new Date().getFullYear()}, {footer.data.copy}
      </div>
    </footer>
    </Section>
  );
}

export default Footer;
