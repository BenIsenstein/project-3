import styled, {css} from 'styled-components'

const Input = styled.input.attrs(props => ({
    onClick: props.detailedPage && props.shouldBlur ? e => e.target.blur() : props.onFocus
}))`
    width: 100%;
    padding: .4em .6em;
    font-size: 1em;
    color: ${props => props.theme.contentColor};
    border: 1px solid ${props => props.theme.prm};
    border-radius: 6px;
    outline: none;
    box-sizing: border-box;

    ${props => props.detailedPage && css`
        padding: .4em 0;
        border: none;
    `} 

    &:focus {
        padding: .4em .6em;
        background-color: ${props => props.theme.scdLt};
        border: 1px solid ${props => props.theme.prmDk};
        outline: none;
    }
`

const PasswordInput = styled(Input)`
    letter-spacing: .2em;
`

export {Input, PasswordInput}

