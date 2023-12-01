// import scrollDelay from './src/gatsby/browser/shouldUpdateScroll'
// import CustomLayout from './src/gatsby/browser/wrapPageElement'
// export const wrapPageElement = CustomLayout
// export const shouldUpdateScroll = scrollDelay

// import React from "react";
// import Layout from "./src/components/Layout";

// const transitionDelay = 500;

// export const wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>;
// };

// export const shouldUpdateScroll = ({
//   routerProps: { location },
//   getSavedScrollPosition
// }) => {
//   if (location.action === "PUSH") {
//     window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
//   } else {
//     const savedPosition = getSavedScrollPosition(location);
//     window.setTimeout(
//       () => window.scrollTo(...(savedPosition || [0, 0])),
//       transitionDelay
//     );
//   }
//   return false;
// };