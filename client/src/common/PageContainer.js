import styled from 'styled-components'
import {pageLoad} from './'

const PageContainer = styled.div`
    width: 95%;
    margin: 0.5em 0;
    animation: ${pageLoad} 0.4s linear;

    @media (min-width: 641px) {
        width: 75vw;
`

export {PageContainer}