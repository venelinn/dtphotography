import React from 'react';
import PropTypes from 'prop-types';
import SEO from '~components/Seo';
import Section from '../components/Section';
import Portfolio from '../components/Portfolio';

const IndexPage = () => {
  return (
    <>
      <SEO
        title={'Dimitar Tsvetkov'}
        keywords={[
          `photography`
        ]}
      />
      <Section>
        <Portfolio />
      </Section>
    </>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.object
};

