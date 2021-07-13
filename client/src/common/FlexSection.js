import styled, {css} from 'styled-components'

const FlexSection = styled.div`
    display: flex;
    align-items: center;

    ${props => props.alignStart && css`
        align-items: flex-start;
    `}

    ${props => props.column && css`
        flex-direction: column;
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
`

export {FlexSection}
