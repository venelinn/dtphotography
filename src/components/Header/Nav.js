import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import './Nav.scss';

const query = graphql`
  query Menu {
    data: allContentfulPage(sort:  {fields: [title], order: DESC}) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`

const Nav = () => {
  const menuData = useStaticQuery(query)
  const menu = menuData.data.edges.map(item => item.node);
  return (
    <nav className="nav nav-metas">
      <span className="is-accessible">Meta navigation</span>
      <ul className="nav-menu">
        {menu.map((item, index) => {
          return (
            <li key={index}>
              <Link className="link" to={`/${item.slug}`} activeClassName="link--active">{item.title}</Link>
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
