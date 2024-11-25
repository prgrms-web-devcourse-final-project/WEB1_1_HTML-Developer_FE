/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f9f9f9;
      }

      #root {
        width: 100%;
        height: 100%;
      }
    `}
  />
);

export default GlobalStyle;
