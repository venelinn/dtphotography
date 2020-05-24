/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      allContentfulPortfolio {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  const portfolioTemplate = path.resolve('src/templates/portfolio.jsx');

  pages.data.allContentfulPortfolio.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}`,
      component: portfolioTemplate,
      context: {
        id: edge.node.id,
      },
    });
  });
};