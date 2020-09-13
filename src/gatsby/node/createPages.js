const config = require('../../../gatsby-config')
const query = require('../data/query')
const path = require('path');
const { paginate } = require('gatsby-awesome-pagination');

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPath = config.siteMetadata.blogPath || '/blog';
  const templatesDirectory = path.resolve(__dirname, '../../templates');
  const templates = {
    portfolio: path.resolve(templatesDirectory, 'portfolio.jsx'),
    post: path.resolve(templatesDirectory, 'post.js'),
    posts: path.resolve(templatesDirectory, 'posts.js'),
    //page: path.resolve(templatesDirectory, 'page.js'),
  }

  // Pages
  // const pagesQuery = await graphql(query.data.pages)
  // const pages = pagesQuery.data.allContentfulPage.edges
  // pages.forEach(page => {
  //   createPage({
  //     path: `/`,
  //     component: templates.page,
  //     context: {
  //       id: page.node.id,
  //     },
  //   });
  // });

  // Portfolios
  const portfolioQuery = await graphql(query.data.portfolios)
  const portfolios = portfolioQuery.data.allContentfulPortfolio.edges
  portfolios.forEach(portfolio => {
    createPage({
      path: `/${portfolio.node.slug}`,
      component: templates.portfolio,
      context: {
        id: portfolio.node.id,
      },
    });
  });

  // Posts
  const postsQuery = await graphql(query.data.posts)
  const posts = postsQuery.data.allContentfulPost.edges
  posts.forEach((post, index) => {
    createPage({
      //path: post.node.slug,
      path: `${blogPath}${post.node.slug}/`,
      component: templates.post,
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
    itemsPerFirstPage: config.siteMetadata.postsPerFirstPage || 7,
    itemsPerPage: config.siteMetadata.postsPerPage || 6,
    pathPrefix: blogPath,
    component: templates.posts
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

// Import alias
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~components": path.resolve(__dirname, "src/components")
      }
    }
  });
};