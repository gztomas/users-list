import { css } from "@emotion/react";

export const theme = {
  color: {
    bgContrast: "rgba(0, 0, 0, 0.3)",
    bgHaze: "#F8F8F8",
    bgPrimary: "#FFFFFF",
    disabled: "rgba(0, 0, 0, 0.5)",
    divider: "rgba(0, 0, 0, 0.1)",
    focus: "rgba(0, 0, 0, 0.5)",
    hover: "rgba(0, 0, 0, 0.4)",
    primary: "#000000",
    secondary: "rgba(0, 0, 0, 0.4)",
  },
};

declare module "@emotion/react" {
  export interface Theme {
    color: typeof theme.color;
  }
}

export const globalStyles = css`
  html,
  body {
    background-color: ${theme.color.bgHaze};
    font-family: Source Sans Pro, sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
  }
  button {
    font-family: Source Sans Pro, sans-serif;
  }
  h1 {
    font-size: 3rem;
    font-weight: 300;
    line-height: 3.75rem;
    margin: 0;
  }
  h2 {
    font-size: 1.3125rem;
    font-weight: 600;
    line-height: 1.625rem;
    margin: 0;
  }
  p {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.256875rem;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;
