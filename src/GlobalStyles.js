import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing: border-box;
    }
    body {
        background-color: #5E5E5E;
        min-height: 100vh;
        /* max-width: 428px; */
        display: flex;
        justify-content: center;
        align-items: center 
    }
`