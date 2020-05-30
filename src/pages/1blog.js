import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Section from '../components/Section';
//import Portfolio from '../components/Portfolio';

const BlogPage = () => {
  return (
    <Layout bodyClass="blog">
      <SEO
        title={'Dimitar Tsvetkov'}
        keywords={[
          `photography`
        ]}
      />
      <Section>
        posts here
        {/* <Portfolio /> */}
      </Section>
    </Layout>
  );
};

export default BlogPage;

BlogPage.propTypes = {
  data: PropTypes.object
};

