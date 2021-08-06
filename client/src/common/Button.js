import styled, {css} from 'styled-components'
import {fadeIn} from './'

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

    ${props => props.fadeIn && css`
        animation: ${fadeIn} 0.4s linear;
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

    ${props => props.fullWidth && css`
        width: 100%;
        margin: .05em;
        display: flex;
        justify-content: center;
    `}

    ${props => props.fullHeight && css`
        height: 100%;
    `}

    ${props => props.alignSelfStart && css`
        align-self: flex-start;
    `}

    ${props => props.justifySelfStart && css`
        justify-self: flex-start;
    `}

    ${props => props.margin && css`
        margin: ${props.margin};
    `}

    ${props => props.inline && css`
        margin: 0 0 0 .6em;
        border: none;
        border-radius: 50px;
        color: white;
        font-size: .6em;
        background: ${props => props.theme.prm};

        &:hover {
            color: white;
            background: ${props => props.theme.prmDk};
            border: none;
        }
    `}

    ${props => props.text && css`
        margin: 0;
        padding: 0;
        border: none;
        font-size: .8em;
        text-transform: none;

        &:hover {
            border: none;
        }
    `}
`

export {Button}