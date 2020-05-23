import { createGlobalStyle } from 'styled-components';

import BebasKai from '../fonts/BebasKai/BebasKai.woff';

export { BebasKai };

export default createGlobalStyle`
  :root {
    --base-color: #ff0100;
    --color-dark: #313131;
    --color-light: #444;
    --color-white: 255,255,255;
    --color-black: 0,0,0;
    --page-max-width: 850px;
    --text-in: cubic-bezier(.31,.11,.12,.99);
    --primary-ease: var(--custom-ease-1);
    --body-font: 'BebasKai', serif;
    --header-font: 'BebasKai', serif;
  }
  @font-face {
    font-family: "BebasKai";
    font-style: normal;
    font-weight: normal;
    font-display: fallback;
    src: local("BebasKai"),
        url(${BebasKai}) format("woff");
  }
`;
