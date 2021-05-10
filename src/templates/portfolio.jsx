import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SEO from '../components/Seo';
import Section from '../components/Section';
import Gallery from '../components/ImageGrid'

import './portfolio.scss';

const PortfolioTemplate = ({ data}) => {
  const {
    title,
    ogimg,
    images,
    desc
  } = data.contentfulPortfolio
  const [descExpand, setDescExpand] = useState(false);
  const expandText = () => {
    setDescExpand(!descExpand)
  };
  const fluid = images.map(item => ({
    id: item.id,
    ...item.fluid,
    caption: title
  }));

  const full = images.map(item => ({
    id: item.id,
    ...item.gatsbyImageData,
    caption: title
  }));

  return (
    <>
      <SEO
        title={'Dimitar Tsvetkov'}
        keywords={[
          `photography`
        ]}
        image={ogimg.fixed.src}
      />
      <Section className="work">
        <div className="work__header">
          <h1 className="title title--h1 work__title">{title}</h1>
          {desc && (
          <div
            className={`work__desc work__desc--${descExpand ? 'on' : 'off'}`}
            role="button"
            tabIndex={0}
            onClick={() => expandText()}
            onKeyDown={() => expandText()}
            >{desc.description}</div>
          )}
        </div>
        <Gallery
          images={fluid}
          full={full}
          itemsPerRow={[1, 2]}
        />
      </Section>
    </>
  );
};

export default PortfolioTemplate

PortfolioTemplate.propTypes = {
  data: PropTypes.shape({
    contentfulPortfolio: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query PortfolioQuery($id: String!) {
    contentfulPortfolio(id: { eq: $id }) {
      id
      title
      desc: childContentfulPortfolioDescriptionTextNode {
        description
      }
      ogimg: cover {
        fixed(width: 900) {
          ...GatsbyContentfulFixed_withWebp
        }
      }
      images {
        id
        gatsbyImageData(width: 2000, formats: [AUTO, WEBP])
        fluid(maxWidth: 500, quality: 80) {
          aspectRatio
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;