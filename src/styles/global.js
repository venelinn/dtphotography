import { createGlobalStyle } from 'styled-components';

import BebasKai from '../fonts/BebasKai/BebasKai.woff';
import JostTTF from '../fonts/jost/Jost-400-Book.ttf';
import JostWOFF2 from '../fonts/jost/Jost-400-Book.woff2';

export { BebasKai, JostTTF, JostWOFF2, };

export default createGlobalStyle`
  :root {
    --base-color: #48a7d1;
    --color-dark: #313131;
    --color-light: #444;
    --color-white: 255,255,255;
    --color-black: 0,0,0;
    --text-in: cubic-bezier(.31,.11,.12,.99);
    --primary-ease: var(--custom-ease-1);
    --body-font: 'Jost', serif;
    --header-font: 'BebasKai', serif;
    --page-max-width: 1200px;
    --header-height: 140px;
    --header-height-m: 80px;
  }
  @font-face {
    font-family: "Jost";
    font-style: normal;
    font-weight: normal;
    font-display: fallback;
    src: local("Jost"),
        url(${JostTTF}) format("ttf"),
        url(${JostWOFF2}) format("woff2");
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
