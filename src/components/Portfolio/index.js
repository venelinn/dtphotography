import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useTrail, config } from 'react-spring';
import PortfolioItem from './PortfolioItem';

import './portfolio.scss';

const query = graphql`
  query Folio {
    data: allContentfulPortfolio(sort: {date: DESC}) {
      edges {
        node {
          title
          slug
          date
          cover {
            gatsbyImageData(layout: FULL_WIDTH, width: 500)
          }
        }
      }
    }
  }
`;

const Portfolio = () => {
  const folioData = useStaticQuery(query);
  const data = folioData.data.edges.map(item => item.node);
  const trail = useTrail(data.length, {
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, 15px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  });
  return (
    <div className='portfolio'>
      <div className='portfolio__grid'>
        {trail.map((style, index) => (
          <PortfolioItem style={style} key={index} data={data[index]} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
