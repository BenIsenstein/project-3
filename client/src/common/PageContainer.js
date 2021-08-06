import styled, {css} from 'styled-components'
import {slideInBottom} from './'

const PageContainer = styled.div`
    width: 95%;
    min-height: 90vh;
    margin: 0 0 1.4em 0;
    padding: .5em;
    background-color: ${props => props.theme.bkg};
    border-radius: 10px;
    animation: ${slideInBottom} 0.4s linear;

    ${props => props.flexColumn && css`
        display: flex;
        flex-direction: column;
    `}

    ${props => props.centerPage && css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `}
    
    ${props => props.mockMobileView && css`
        min-height: 90vh;
    `}      

    @media (min-width: ${props => props.theme.smScreen}) {
        width: 75vw;
        padding: 1.4em;
    }
`

export {PageContainer}