import styled, {css} from 'styled-components'
import {pageLoad} from './'

const PageContainer = styled.div`
    width: 95%;
    margin: 0.5em 0;
    animation: ${pageLoad} 0.4s linear;

    ${props => props.centerPage && css`
        min-height: 70vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `}      

    @media (min-width: 641px) {
        width: 75vw;
`

export {PageContainer}