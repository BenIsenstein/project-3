import styled, {css} from 'styled-components'

const Button = styled.button`
    display: flex;
    align-items: center;
    margin: 0.2em 0;
    padding: 0.4em 1em;
    background: transparent;
    border: 1px solid ${props => props.theme.prm};
    border-radius: 6px;
    font-size: 0.8em;
    font-weight: lighter;
    color: ${props => props.theme.prm};
    text-transform: uppercase;
    // transition: background 0.4s linear;

    &:hover {
        border: 1px solid ${props => props.theme.prmDk};
        color: ${props => props.theme.prmDk};
    }

    ${props => props.important && css`
        background: ${props => props.theme.prm};
        color: white;

        &:hover {
            background: ${props => props.theme.prmDk};
            color: white;
        }
    `}

    ${props => props.icon && css`
        padding: 0.4em;
    `}

    ${props => props.constWidth && css`
        min-width: 14em;
        display: flex;
        justify-content: center;
    `}
    
    ${props => props.formSubmit && css`
        margin-top: 2em;
        align-self: center;
    `}

    ${props => props.round && css`
        border-radius: 50%;
    `}
`

export {Button}