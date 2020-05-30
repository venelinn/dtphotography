const path = require(`path`);
require('dotenv').config({ path: `./.env` });

module.exports = {
  siteMetadata: {
    title: `Dimitar Tsvetkov • Photographer`,
    description: `Dimitar Tsvetkov • Photographer`,
    siteUrl: 'https://dtphotography.ca/', // Site domain. Do not include a trailing slash! If you wish to use a path prefix you can read more about that here: https://www.gatsbyjs.org/docs/path-prefix/
    author: 'Dimitar Tsvetkov', // Author for RSS author segment and SEO schema
    authorJob: `Photographer`,
    copyright: 'Dimitar Tsvetkov Photography',
    userTwitter: '@dtphotography', // Change for Twitter Cards
    shortTitle: 'DTP', // Used for App manifest e.g. Mobile Home Screen
    shareImage: `/images/share.jpg`, // Open Graph Default Share Image. 1200x1200 is recommended
    shareImageWidth: 900, // Change to the width of your default share image
    shareImageHeight: 600, // Change to the height of your default share image
    siteLogo: `/images/favicons/android-chrome-512x512.png`, // Logo used for SEO, RSS, and App manifest
    blogPath: '/blog/',
    postsPerFirstPage: 7,
    postsPerPage: 6
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,

    {
      resolve: `gatsby-plugin-sass`,
      options: {
        data: '@import "src/styles/global.scss";',
        includePaths: ['src/styles']
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`)
      }
    },
    //'gatsby-plugin-netlify',
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-mdx`,
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
          `gatsby-remark-emojis`,
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 650,
              backgroundColor: 'white',
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: `${process.env.CONTENTFUL_SPACE_ID}`,
        accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`
      }
    },
    //`@contentful/gatsby-transformer-contentful-richtext`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
        head: true
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dimitar Tsvetkov Photography`,
        short_name: `DTP`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        description: `Photographer`,
        display: `minimal-ui`,
        lang: `en-US`,
        icon: `${__dirname}/src/images/dtp-icon.png` // This path is relative to the root of the site.
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline'
  ]
}
