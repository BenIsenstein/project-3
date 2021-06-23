import styled, {css} from 'styled-components'

const Button = styled.button`
    padding: 0.2em 1em;
    background: white;
    border: 2px solid #A7275E;
    border-radius: 3px;
    font-size: 0.9em;
    color: #A7275E;
    cursor: pointer;

    &:hover {
        background: #A7275E;
        color: white;
    }
`

export {Button}