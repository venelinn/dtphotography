import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import './Nav.scss';

const query = graphql`
  query Navigation {
    data: allContentfulPage(sort:  {fields: [menu], order: DESC}) {
      edges {
        node {
          menu
          slug
        }
      }
    }
  }
`

const Nav = () => {
  const menuData = useStaticQuery(query)
  const nav = menuData.data.edges.map(item => item.node);
  return (
    <nav className="nav nav-metas">
      <span className="is-accessible">Meta navigation</span>
      <ul className="nav-menu">
        {nav.map((item, index) => {
          return (
            <li key={index}>
              <Link className="link" to={`/${item.slug}`} activeClassName="link--active">{item.menu}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  menu: PropTypes.array
}

export default Nav;
