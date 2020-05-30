/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


const path = require('path');
const config = require('./gatsby-config')
const { paginate } = require('gatsby-awesome-pagination');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPath = config.siteMetadata.blogPath || '/blog/';

  // Portfolios
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

  // Posts
  const postsQuery = await graphql(`
    {
      allContentfulPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  const postTemplate = path.resolve('src/templates/post.js');
  const posts = postsQuery.data.allContentfulPost.edges

  posts.forEach((post, index) => {
    createPage({
      //path: post.node.slug,
      path: `${blogPath}${post.node.slug}/`,
      component: postTemplate,
      context: {
        id: post.node.id,
        slug: post.node.slug,
        basePath: blogPath,
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === (posts.length - 1) ? null : posts[index + 1].node
      },
    })
  });

  paginate({
    createPage,
    items: posts,
    itemsPerPage: 2,
    pathPrefix: blogPath,
    component: path.resolve('src/templates/posts.js')
  });



  // Post

  // const post = await graphql(`
  //   {
  //     allContentfulPost {
  //       edges {
  //         node {
  //           id
  //           slug
  //         }
  //       }
  //     }
  //   }
  // `);
  // const postTemplate = path.resolve('src/templates/post.js');

  // post.data.allContentfulPost.edges.forEach(edge => {
  //   createPage({
  //     path: `/blog/${edge.node.slug}`,
  //     component: postTemplate,
  //     context: {
  //       id: edge.node.id,
  //     },
  //   });
  // });

};