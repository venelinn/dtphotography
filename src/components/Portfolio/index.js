import React from 'react';
import { graphql, useStaticQuery } from 'gatsby'
import { useTrail, config } from "react-spring"
import PortfolioItem from "./PortfolioItem"

import './portfolio.scss';

const query = graphql`
  query Folio {
    data: allContentfulPortfolio(sort:  {fields: [title], order: DESC}) {
      edges {
        node {
          title
          slug
          cover {
            fluid(maxWidth: 1000, quality: 80) {
              ...GatsbyContentfulFluid_withWebp
            }
            sizes(maxWidth: 1000) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
        }
      }
    }
  }
`

const Portfolio = () => {
  const folioData = useStaticQuery(query)
  const data = folioData.data.edges.map(item => item.node);
  const trail = useTrail(data.length, {
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, 15px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })
  return (
    <div className='portfolio'>
      <div className='portfolio__grid'>
        {trail.map((style, index) =>  <PortfolioItem style={style} key={index} data={data[index]} />)}
      </div>
  </div>
  );
};

export default Portfolio;
