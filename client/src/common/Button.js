import styled, {css} from 'styled-components'

const Button = styled.button`
    display: flex;
    align-items: center;
    margin: 0.2em 0;
    padding: 0.4em 1em;
    background: white;
    border: 1px solid #8eb9bf;
    border-radius: 6px;
    font-size: 0.8em;
    font-weight: lighter;
    color: #8eb9bf;
    text-transform: uppercase;
    cursor: pointer;
    // transition: background 0.4s linear;

    &:hover {
        border: 1px solid #5c949c;
        color: #5c949c;
    }

    ${props => props.important && css`
        background: #8eb9bf;
        color: white;

        &:hover {
            background: #5c949c;
            color: white;
        }
    `}
`

export {Button}