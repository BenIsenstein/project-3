import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
    body {
        background: ${props => props.theme.bkg};
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 1em;
        color: ${props => props.theme.titleColor};
    }

    p {
        margin: 0.8em 0;
        color: ${props => props.theme.contentColor};
    }

    span {
        color: ${props => props.theme.contentColor};
    }

    button {
        cursor: pointer;
    }
`