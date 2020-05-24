import React from 'react';
//import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Section from '../components/Section';



const AboutPage = props => {
  //const sections = props.data.sectionsData.edges[0].node.modules;

  return (
    <Layout bodyClass="about">
      <SEO
        title={'Dimitar Tsvetkov'}
        keywords={[
          `photography`
        ]}
      />
      <Section>
        About page
      </Section>
    </Layout>
  );
};

export default AboutPage;

AboutPage.propTypes = {
  data: PropTypes.object
};

// export const query = graphql`
//   query Index {
//     headerData: contentfulIntro {
//       title
//       description
//       slug
//       sectionTitle
//       modules {
//         ... on ContentfulHero {
//           title
//           image {
//             fluid(maxWidth: 1400, quality: 90) {
//               ...GatsbyContentfulFluid_withWebp_noBase64
//             }
//           }
//           media {
//             title
//             description
//             fluid(maxWidth: 1400, quality: 90) {
//               ...GatsbyContentfulFluid_withWebp_noBase64
//             }
//           }
//         }
//       }
//     }
//   }
// `;
