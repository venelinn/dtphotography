import React from 'react'
import { graphql } from 'gatsby'
import Section from '../components/Section'
import Hero from '../components/Hero'
import PageBody from '../components/Post/PageBody'
// import TagList from '../components/TagList'
import PostLinks from '../components/Post/PostLinks'
import PostDetails from '../components/Post/PostDetails'
import SEO from '../components/Seo'

const PostTemplate = ({ data, pageContext }) => {
  const {
    title,
    metaDescription,
    hero,
    body,
    publishDate,
  } = data.contentfulPost

  const previous = pageContext.prev
  const next = pageContext.next

  const { basePath } = pageContext
  let ogImage
  try {
    ogImage = hero.ogimg.src
  } catch (error) {
    ogImage = null
  }

  return (
    <>
      <SEO
        title={title}
        description={metaDescription}
        image={ogImage}
      />
      <Hero title={title} image={hero}  />
      <Section className="fixed">
        {/* {tags && <TagList tags={tags} basePath={basePath} />}*/}
        <PostDetails
          date={publishDate}
          timeToRead={body.childMarkdownRemark.timeToRead}
        />
        <PageBody body={body} />
        <PostLinks previous={previous} next={next} basePath={basePath} />
      </Section>
    </>
  )
}

export const postQuery = graphql`
  query($id: String!) {
    contentfulPost(id: { eq: $id }) {
      title
      slug
      metaDescription
      publishDate(formatString: "MMMM DD, YYYY")
      hero: heroImage {
        title
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
        ogimg: resize(width: 800) {
          src
        }
      }
      body {
        childMarkdownRemark {
          timeToRead
          html
          excerpt(pruneLength: 320)
        }
      }
    }
  }
`

export default PostTemplate