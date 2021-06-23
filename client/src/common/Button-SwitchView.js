import styled, {css} from 'styled-components'

const SwitchViewButton = styled.button`
    padding: 0.2em;
    background: #FFD4E7;
    border: none;
    color: white;
    cursor: pointer;

    ${props => props.activeView && css`
        background: #A7275E;
        color: white;
    `}
`

export {SwitchViewButton}