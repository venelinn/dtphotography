import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SEO from '../components/Seo';
import Section from '../components/Section/Section';
import Gallery from '../components/ImageGrid'

import './portfolio.scss';

const PortfolioTemplate = ({ data }) => {
  const { title, ogimg, small, large, desc, slug } = data.contentfulPortfolio
  const [descExpand, setDescExpand] = useState(false);
  const expandText = () => {
    setDescExpand(!descExpand)
  };

  const mapImageData = (imageArray, caption) => {
    return imageArray.map(item => ({
      id: item.id,
      ...item.gatsbyImageData,
      caption: caption
    }));
  };

  const thumbs = mapImageData(small, title);
  const full = mapImageData(large, title);

  return (
    <>
      <SEO
        title={'Dimitar Tsvetkov'}
        keywords={[
          `photography`
        ]}
        image={ogimg}
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
              >
                {desc.description}
            </div>
          )}
        </div>
        <Gallery
          thumbs={thumbs}
          full={full}
          slug={slug}
          // itemsPerRow={[1, 2]}
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
      slug
      desc: childContentfulPortfolioDescriptionTextNode {
        description
      }
      ogimg: cover {
        id
        gatsbyImageData(layout: FULL_WIDTH, width: 900)
      }
      small: images {
        id
        gatsbyImageData(layout: FULL_WIDTH, width: 500)
      }
      large: images {
        id
        gatsbyImageData(layout: CONSTRAINED, width: 1800, quality: 100)
      }
    }
  }
`;