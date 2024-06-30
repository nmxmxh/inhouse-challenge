"use client";

import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";

const GlobalStyles = createGlobalStyle`
  	${fonts}

:root {
  --width: 85%;
  --max-width: 90%;

  --darkBlue: hsl(209, 23%, 22%);
  --darkerBlue: hsl(207, 26%, 17%);

  --darkBlueText: hsl(200, 15%, 8%);
  --darkGray: hsl(0, 0%, 52%);

  --lightGray: hsl(0, 0%, 98%);
  --white: hsl(0, 0%, 100%);

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

* {
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  transform: translate3d(0, 0, 0);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  border: 0;
  padding: 0;
  margin: 0;
  font-family: var(--primary-font);
  font-optical-sizing: auto;
  font-style: normal;
}

html {
  touch-action: none;
}

body {
  position: absolute;
}

html,
body {
  width: 100%;
  min-width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  background-color: #060505;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding: 0;
  outline: none;
  scroll-behavior: smooth;
  user-select: none;
}

svg {
  transition: fill 0.25s ease-in;
  path {
    transition: fill 0.25s ease-in;
  }
}

a,
button {
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  font-size: inherit;
  color: inherit;
}


html {
  --full-screen-w: 100svw;
  --full-screen-h: 100svh;
}

div {
  box-sizing: border-box;
}

@media (orientation: landscape) {
  html {
    --full-screen-w: 100svh;
    --full-screen-h: 100svw;
  }

  #root {
    flex-direction: row;
  }
}
`;

export default GlobalStyles;
