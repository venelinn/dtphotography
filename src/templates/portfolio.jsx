import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from "gatsby-image"
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Section from '../components/Section';

import './portfolio.scss';

const ImgWithOrient = ({ aspectRatio, key, ...props }) => {
  let orientation;
  if (aspectRatio >= 1.2) orientation = "landscape";
  if (aspectRatio <= 0.8) orientation = "portrait";
  if (aspectRatio > 0.8 && aspectRatio < 1.2) orientation = "square";

  return (
    <div className={`gallery__item gallery__item--${orientation}`} key={key}>
      <Img {...props} />
    </div>
  );
};

const PortfolioTemplate = ({ data}) => {
  const {
    title,
    images,
    desc
  } = data.contentfulPortfolio
  const [descExpand, setDescExpand] = useState(false);
  const expandText = () => {
    setDescExpand(!descExpand)
  };

  return (
    <Layout bodyClass="portfolio">
      <SEO
        title={'Dimitar Tsvetkov'}
        keywords={[
          `photography`
        ]}
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
        <div className="gallery">
          {images.map((item, index) => (
            <ImgWithOrient
              key={index}
              aspectRatio={item.fluid.aspectRatio}
              alt={item.title}
              fluid={item.fluid}
            />
          ))}
        </div>
      </Section>
    </Layout>
  );
};

export default PortfolioTemplate;

PortfolioTemplate.propTypes = {
  data: PropTypes.shape({
    contentfulPortfolio: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query Portfolio($id: String!) {
    contentfulPortfolio(id: { eq: $id }) {
      id
      title
      desc: childContentfulPortfolioDescriptionTextNode {
        description
      }
      images {
        fluid(maxWidth: 1500, quality: 80) {
          aspectRatio
          ...GatsbyContentfulFluid_withWebp
        }
        fixed(width: 500, height: 500, quality: 80) {
          width
          height
          ...GatsbyContentfulFixed_withWebp_noBase64
        }
      }
    }
  }
`;