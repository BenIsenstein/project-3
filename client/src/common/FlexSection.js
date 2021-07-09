import styled, {css} from 'styled-components'

const FlexSection = styled.div`
    display: flex;
    align-items: center;

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

    ${props => props.fullWidth && css`
        width: 100%;
    `}
`

export {FlexSection}
