import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Section from '../components/Section'
import Card from '../components/Post/PostCard';
import Pager from '../components/Pager';
import SEO from '../components/Seo'
import styled from 'styled-components'
import { breakpoints } from '../styles/global'

const List = styled.div`
  display: grid;
  grid-gap: 1rem 2rem;
  @media (min-width: ${() => breakpoints.smedium}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const BlogArchive = ({ data, pageContext }) => {
  const posts = data.allContentfulPost.edges;
  const basePath = '/blog/'

  return (
    <Layout bodyClass="blog">
      <SEO title="Blog" />
      <Section className="fixed">
        <List>
          {posts.map(({ node: post }) => {
            //const cyr = /[а-яА-ЯЁё]/.test(node.title)
            return (
              <Card key={post.id} {...post} basePath={basePath} />
            )
          })}
        </List>
      <Pager pageContext={pageContext} />
      </Section>

    </Layout>
  )
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
            sizes(maxWidth: 600) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          body {
            childMarkdownRemark {
              timeToRead
              excerpt(pruneLength: 200)
            }
          }
        }
       }
    }
  }
`;
