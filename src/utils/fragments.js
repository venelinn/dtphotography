import { graphql } from 'gatsby'

/**
* These so called fragments are the fields we query on each template.
* A fragment make queries a bit more reuseable, so instead of typing and
* remembering every possible field, you can just use
*   ...GhostPostFields
* for example to load all post fields into your GraphQL query.
*
* Further info 👉🏼 https://www.gatsbyjs.org/docs/graphql-reference/#fragments
*
*/

// Used for home page

export const AboutPageFragment = graphql`
  fragment AboutPageFragment on ContentfulPageConnection {
      edges {
        node {
          title
          desc: childContentfulPageDescriptionTextNode {
            description
          }
          hero {
            title
            description
            gatsbyImageData(layout: FULL_WIDTH, width: 1400)
           }
        }
      }
    }
`;
