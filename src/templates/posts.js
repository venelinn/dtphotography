import React from 'react';
import { graphql } from 'gatsby';
//import { useTrail, config } from "react-spring"
import Section from '../components/Section/Section';
import Card from '../components/Post/PostCard';
import Pager from '../components/Pager';
import SEO from '../components/Seo';
import styled from 'styled-components';
import { breakpoints } from '../styles/global';

const List = styled.div`
  display: grid;
  gap: 1rem 2rem;
  @media (min-width: ${() => breakpoints.smedium}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const BlogArchive = ({ data, pageContext }) => {
  const posts = data.allContentfulPost.edges;
  const basePath = '/blog/';
  // const trail = useTrail(data.length, {
  //   config: config.slow,
  //   from: { opacity: 0, transform: 'translate3d(0, 15px, 0)' },
  //   to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  // })

  return (
    <>
      <SEO title="Blog" />
      <Section className="fixed">
        <List>
          {posts.map(({ node: post }) => {
            //const cyr = /[а-яА-ЯЁё]/.test(node.title)
            return (
              <Card key={post.id} {...post} basePath={basePath} />
            );
          })}
        </List>
        <Pager pageContext={pageContext} />
      </Section>
    </>
  );
};

export default BlogArchive;


export const pageQuery = graphql`
  query($limit: Int!) {
    allContentfulPost(
        sort: { fields: publishDate, order: DESC},
        limit: $limit
        ) {
      edges {
        node {
          id
          title
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          heroImage {
            gatsbyImageData(layout: FULL_WIDTH, width: 500)
          }
          excerpt
        }
       }
    }
  }
`;
