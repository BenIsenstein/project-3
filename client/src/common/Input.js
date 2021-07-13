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
    // position: relative !important;
    // appearance: none;
    // box-sizing: content-box;
    // overflow: hidden;

    // &:before {
    //     content: '';
    //     display: block;
    //     box-sizing: content-box;
    //     width: 1em;
    //     height: 1em;
    //     border: 2px solid ${props => props.theme.prm};
    //     border-radius: 4;
    //     transition: 0.2s border-color ease;
    // }

    // &:checked:before {
    //     border-color: ${props => props.theme.prm};
    //     transition: 0.5s border-color ease;
    // }

    // // dot
    // &:after {
    //     content: '';
    //     display: block;
    //     position: absolute;
    //     box-sizing: content-box;
    //     top: 50%;
    //     left: 50%;
    //     transform-origin: 50% 50%;
    //     background-color: ${props => props.theme.prm};
    //     width: 1em;
    //     height: 1em;
    //     border-radius: 100vh;
    //     transform: translate(-50%, -50%) scale(0);
    // }
`

export {Input, PasswordInput, Checkbox}

