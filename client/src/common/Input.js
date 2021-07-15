import styled, {css} from 'styled-components'

const Input = styled.input`
    width: 100%;
    padding: .4em .6em;
    font-family: inherit;
    font-size: 1em;
    color: ${props => props.theme.contentColor};
    border: 1px solid ${props => props.theme.prm};
    border-radius: 6px;
    outline: none;
    box-sizing: border-box;
    
    &:focus {
        padding: .4em .6em;
        background-color: ${props => props.theme.scdLt};
        border: 1px solid ${props => props.theme.prmDk};
        outline: none;
    }

    ${props => props.readOnly && css`
        border: none;
        padding: .4em 0;
        cursor: default;

        &:focus {
            padding: .4em 0;
            background: none;
            border: none;
            outline: none;
        }
    `} 
`

const PasswordInput = styled(Input)`
    letter-spacing: .2em;
`

const Checkbox = styled.input.attrs({
    type: 'checkbox'
})`
    cursor: pointer;
    // position: absolute;
    // opacity: 0;
    // height: 0;
    // width: 0;
`

export {Input, PasswordInput, Checkbox}

