import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
// import PropTypes from 'prop-types';

import './Nav.scss';

const query = graphql`
  query Navigation {
    data: allContentfulPage(sort: {menu: DESC}) {
      edges {
        node {
          menu
          slug
        }
      }
    }
    nav: allContentfulNavigation {
      edges {
        node {
          links {
            title
            url
          }
        }
      }
    }
  }
`;

const isExternalLink = slug => slug.startsWith('http');

const Nav = () => {
  const menuData = useStaticQuery(query);
  const menu = menuData.data.edges.map(item => item.node);
  const navLinks = menuData.nav.edges[0].node.links.map(link => ({
    menu: link.title,
    slug: link.url,
  }));
  return (
    <nav className="nav nav-metas">
      <span className="is-accessible">Meta navigation</span>
      <ul className="nav-menu">
        {[...menu, ...navLinks].map((item, index) => (
          <li key={index}>
             <Link
              className={`link${item.slug === 'index' ? ' link--active' : ''}`}
              activeClassName="link--active"
              partiallyActive={!isExternalLink(item.slug)}
              to={isExternalLink(item.slug) ? item.slug : item.slug === 'index' ? '/' : `/${item.slug}/`}
              target={isExternalLink(item.slug) ? '_blank' : ''}
              rel={isExternalLink(item.slug) ? 'noopener noreferrer' : ''}
            >
              {item.menu}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Nav.propTypes = {
//   menu: PropTypes.array
// };

export default Nav;
