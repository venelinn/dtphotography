import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Section from '../components/Section';
import Contacts from '../components/Contacts';
import Hero from '../components/Hero';


const AboutPage = props => {
  const about = props.data.about.edges[0].node;
  return (
    <>
      <SEO
        title={'Dimitar Tsvetkov'}
        keywords={[
          `photography`
        ]}
      />

      <Hero title={about.hero.title} image={about.hero} />

      <Section className="fixed">
        <div className="about">
          <div>
            <h2>{about.title}</h2>
            {about.desc.description && (
            <p>{about.desc.description}</p>
            )}
          </div>
          <Contacts />
        </div>
      </Section>
    </>
  );
};

export default AboutPage;

AboutPage.propTypes = {
  data: PropTypes.object
};


export const pageQuery = graphql`
  query AboutPage {
    about: allContentfulPage (
      filter: {
        slug: {eq: "about"}
      }
    )
    {
      ...AboutPageFragment
    }
  }
`

// export const query = graphql`
//   query About {
//     aboutData: contentfulIntro {
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
