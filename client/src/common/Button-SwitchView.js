import styled, {css} from 'styled-components'

const SwitchViewButton = styled.button`
    padding: 0.2em;
    background: #cce2e6;
    border: none;
    color: white;
    cursor: pointer;

    ${props => props.activeView && css`
        background: #8eb9bf;
        color: white;
    `}
`

export {SwitchViewButton}