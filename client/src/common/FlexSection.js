import styled, {css} from 'styled-components'
import {fadeIn} from './'

const FlexSection = styled.div`
    display: flex;
    align-items: center;

    ${props => props.alignStart && css`
        align-items: flex-start;
    `}

    ${props => props.alignEnd && css`
        align-items: flex-end;
    `}

    ${props => props.column && css`
        flex-direction: column;
    `}

    ${props => props.rowReverse && css`
        flex-direction: row-reverse;
    `}

    ${props => props.justifyCenter && css`
        justify-content: center;
    `}

    ${props => props.justifyEnd && css`
        justify-content: flex-end;
    `}

    ${props => props.spaceBetween && css`
        justify-content: space-between;
    `}

    ${props => props.spaceEvenly && css`
        justify-content: space-evenly;
    `}

    ${props => props.fullWidth && css`
        width: 100%;
    `}

    ${props => props.marginTop1em && css`
        margin-top: 1em;
    `}

    ${props => props.marginTop && css`
        margin-top: ${props.marginTop};
    `}

    ${props => props.padding && css`
        padding: ${props.padding};
    `}

    ${props => props.backgroundColor && css`
        background-color: ${props.backgroundColor};
    `}

    ${props => props.popup && css`
        overflow: hidden;
        height: ${props => props.popupCondition ? 'max-content' : '0px'};
        transition: height 1s;
    `}

    ${props => props.fadeIn && css`
        animation: ${fadeIn} 0.4s linear;
    `}

    @media (min-width: ${props => props.theme.smScreen}) {
        ${props => props.gridColumn && css`
        grid-column: ${props.gridColumn};
    `}
    }
`

export {FlexSection}
