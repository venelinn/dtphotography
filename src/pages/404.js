import React from 'react';
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import SEO from '../components/Seo';

const NotFoundPage = props => {
  return (
    <>
      <SEO title='404: Not found' />
      <div className='not-found' data-theme='dark'>
        <h1>404</h1>
        <p>
          Take me back to{' '}
          <Link to='/'>{props.data.site.siteMetadata.siteUrl}</Link>
        </p>
      </div>
    </>
  );
};
export default NotFoundPage;

export const ErrorQuery = graphql`
  query ErrorQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
