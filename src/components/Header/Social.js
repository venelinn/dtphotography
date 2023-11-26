import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import SVG from '../SVG';

import './Social.scss';

const query = graphql`
  query SocialMedia {
    data: allContentfulSocial {
      edges {
        node {
          name
          url
          icon
        }
      }
    }
  }
`;

const Social = () => {
  const socialData = useStaticQuery(query);
  const menu = socialData.data.edges.map(item => item.node);
  return (
    <div className='social intro__social'>
      <ul className='social__list'>
        {menu.map(item => (
          <li key={item.icon}>
            <a
              href={`${item.url}`}
              target='_blank'
              rel='noopener noreferrer'
              title={`${item.name}`}
            >
              <SVG icon={`${item.icon}`} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Social;
