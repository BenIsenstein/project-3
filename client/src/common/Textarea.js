import styled, {css} from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'

const Textarea = styled(TextareaAutosize).attrs(props => ({
    //...props.register(props.name, props.registerOptions)
  }))`
    width: 100%;
    min-height: 1.8em;
    padding: .4em .6em;
    font-family: inherit;
    font-size: 1em;
    color: ${props => props.theme.contentColor};
    border: 1px solid ${props => props.theme.prm};
    border-radius: 6px;
    outline: none;
    resize: none;
    overflow: hidden;

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

export {Textarea}