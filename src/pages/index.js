import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Section from '../components/Section';
import Portfolio from '../components/Portfolio';

const IndexPage = () => {
  return (
    <Layout bodyClass="home">
      <SEO
        title={'Dimitar Tsvetkov'}
        keywords={[
          `photography`
        ]}
      />
      <Section>
        <Portfolio />
      </Section>
    </Layout>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.object
};

