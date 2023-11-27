import React from 'react';
import { graphql } from 'gatsby';
import { object } from 'prop-types';
import Section from '../components/Section/Section';
import Hero from '../components/Hero/Hero';
import PostLinks from '../components/Post/PostLinks';
import PostDetails from '../components/Post/PostDetails';
import SEO from '../components/Seo';
import RichText from '../utils/RichText';

const PostTemplate = ({ data, pageContext }) => {
  const {title, metaDescription, heroImage, publishDate, content } = data.contentfulPost;

  const { prev, next, basePath } = pageContext;


  const ogImage = heroImage?.gatsbyImageData?.images?.fallback?.src || null;

  return (
    <>
      <SEO
        title={title}
        description={metaDescription}
        image={ogImage}
      />
      <Hero title={title} image={heroImage}  />
      <Section className="fixed">
        <PostDetails date={publishDate} />
        <RichText data={content} className="post"  />
        <PostLinks prev={prev} next={next} basePath={basePath} />
      </Section>
    </>
  );
};

PostTemplate.propTypes = {
  data: object.isRequired,
  pageContext: object,
};


export const postQuery = graphql`
  query($id: String!) {
    contentfulPost(id: { eq: $id }) {
      title
      slug
      metaDescription
      publishDate(formatString: "MMMM DD, YYYY")
      heroImage {
        title
        gatsbyImageData(layout: FULL_WIDTH, width: 1000)
      }
      content {
        raw
        references {
          ... on ContentfulAsset {
            # contentful_id is required to resolve the references
            __typename
            contentful_id
            gatsbyImageData(layout: FULL_WIDTH, width: 600)
          }
        }
      }
    }
  }
`;

export default PostTemplate;