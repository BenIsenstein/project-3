import styled, {css} from 'styled-components'

const SwitchViewButton = styled.button`
    padding: 0.2em;
    background: ${props => props.theme.prmLt};
    border: none;
    color: white;

    ${props => props.activeView && css`
        background: ${props => props.theme.prm};
        color: white;
    `}
`

export {SwitchViewButton}