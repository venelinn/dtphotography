import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby';
import Img from "gatsby-image"
import Layout from '../components/Layout'
import Section from '../components/Section'
import Pager from '../components/pager';

export const pageQuery = graphql`
  query($limit: Int!) {
    allContentfulPost(
        sort: { fields: publishDate, order: DESC},
        limit: $limit
        ) {
      edges {
        node {
          title
          slug
          date: publishDate
          thumb: heroImage {
            sizes(maxWidth: 600) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          body {
            childMarkdownRemark {
              excerpt(pruneLength: 320)
            }
          }
        }
       }
    }
  }
`;

const BlogArchive = ({ data, pageContext }) => {
    const posts = data.allContentfulPost.edges;
    return (
      <Layout bodyClass="blog">
        <Section className="fixed">
          {posts.map(({ node }) => {
            //const cyr = /[а-яА-ЯЁё]/.test(node.title)
            return (
              <article key={node.slug} className="posts">
                <Link to={`/blog/${node.slug}`}>
                  <Img sizes={{...node.thumb.sizes, aspectRatio: 16/9}}/>
                </Link>
                <header>
                  <h2 className="title title--h2">
                    <Link to={`/blog/${node.slug}`}>{node.title} </Link>
                  </h2>
                  <div className="blog__date">{node.date}</div>
                </header>
                <section>
                  <p dangerouslySetInnerHTML={{ __html: node.body.childMarkdownRemark.excerpt }} />
                </section>
              </article>
            )
          })}
        <Pager pageContext={pageContext} />
        </Section>

      </Layout>
    )
};

export default BlogArchive;