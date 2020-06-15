module.exports.data = {
  pages: `{
    allContentfulPage {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`,
  portfolios: `{
    allContentfulPortfolio {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`,
  posts: `{
    allContentfulPost {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`,
}
