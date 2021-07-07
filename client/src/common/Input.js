import styled, {css} from 'styled-components'

const Input = styled.input`
    width: 95%;
    padding: .2em .4em;
    font-size: 1em;
    border: 1px solid ${props => props.theme.prm};
    border-radius: 6px;
    outline: none;

    ${props => props.detailedPage && css`
        border: none;
    `} 

    &:focus {
        border: 1px solid ${props => props.theme.prmDk};
        outline: none;
    }
`

const PasswordInput = styled(Input)`
    letter-spacing: .2em;
`

export {Input, PasswordInput}