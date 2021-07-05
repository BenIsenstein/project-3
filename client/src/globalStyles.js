import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
    body {
        background-color: ${props => props.theme.bkg};
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 1em;
        color: #1a2737;
    }

    p {
        margin: 0.8em 0;
        font-size: 1em;
        color: #1a2737;
    }

    button {
        cursor: pointer;
    }
`