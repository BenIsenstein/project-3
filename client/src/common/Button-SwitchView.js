import styled, {css} from 'styled-components'

const SwitchViewButton = styled.button`
    background: ${props => props.theme.prmLt};
    border: none;
    color: white;

    display: flex;
    align-items: center;
    margin: 0.2em 0;
    padding: 0.4em 1em;
    font-size: .8em;
    font-weight: lighter;
    text-transform: uppercase;

    &:hover {
        background: ${props => props.theme.prm};
    }

    ${props => props.activeView && css`
        background: ${props => props.theme.prm};
        color: white;
    `}

    ${props => props.first && css`
        border-radius: 6px 0 0 6px;
    `}

    ${props => props.last && css`
        border-radius: 0 6px 6px 0;
    `}
`

export {SwitchViewButton}