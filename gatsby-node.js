exports.createPages = require('./src/gatsby/node/createPages')

const path = require("path");
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~components": path.resolve(__dirname, "src/components")
      }
    }
  });
};

// const path = require('path')

// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     resolve: {
//       alias: {
//         Shared: path.resolve(__dirname, 'src/components'),
//       },
//     },
//   })
// }