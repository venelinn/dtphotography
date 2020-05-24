import React from 'react';
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'gatsby-link'
import Img from 'gatsby-image';
import Fade from 'react-reveal/Fade';

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
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }
  }
`

const Portfolio = () => {
  const folioData = useStaticQuery(query)
  const gallery = folioData.data.edges.map(item => item.node);

  return (
    <div className='portfolio'>
      <Fade cascade>
      <div className='portfolio__grid'>
        {gallery.map((item, index) => (
          <div className='folio' key={index}>
            <Link
              className='folio__link'
              to={`/${item.slug}`}
            >
              <Img sizes={{...item.cover.sizes, aspectRatio: 16/9}}  />
              <span className='folio__item'>
                <span className='folio__item__cell'>
                  <h3 className='folio__item__title'>{item.title}</h3>
                  <span className='folio__item__types'>{item.types}</span>
                </span>
              </span>
            </Link>
          </div>
        ))}
      </div>
      </Fade>
  </div>
  );
};

export default Portfolio;
