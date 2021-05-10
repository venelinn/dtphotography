import React from 'react';
import { graphql } from 'gatsby';
import { object } from 'prop-types';
import Section from '../components/Section';
import Hero from '../components/Hero';
import PostLinks from '../components/Post/PostLinks';
import PostDetails from '../components/Post/PostDetails';
import SEO from '../components/Seo';
import RichText from '../utils/RichText';

const PostTemplate = ({ data, pageContext }) => {
  const {title, metaDescription, heroImage, publishDate, content } = data.contentfulPost;

  const previous = pageContext.prev;
  const next = pageContext.next;

  const { basePath } = pageContext;
  let ogImage;
  try {
    ogImage = heroImage.ogimg.src;
  } catch (error) {
    ogImage = null;
  }

  return (
    <>
      <SEO
        title={title}
        description={metaDescription}
        image={ogImage}
      />
      <Hero title={title} image={heroImage}  />
      <Section className="fixed">
        <PostDetails
          date={publishDate}
        />
        <RichText data={content} className="post"  />
        <PostLinks previous={previous} next={next} basePath={basePath} />
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
        fluid(maxWidth: 1000) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
        ogimg: resize(width: 800) {
          src
        }
      }
      content {
        raw
        references {
          ... on ContentfulAsset {
            # contentful_id is required to resolve the references
            __typename
            contentful_id
            fluid(maxWidth: 600) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default PostTemplate;