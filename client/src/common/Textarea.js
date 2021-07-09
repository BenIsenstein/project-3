import styled, {css} from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'

const Textarea = styled(TextareaAutosize).attrs(props => ({
    onClick: props.detailedPage && props.shouldBlur ? e => e.target.blur() : props.onFocus
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

    ${props => props.detailedPage && css`
        background-color: ${props => props.theme.scdLt};
        border: 1px solid ${props => props.theme.prmDk};

        &:disabled {
            padding: .4em 0;
            background: none;
            border: none;
        }
    `} 

    &:focus {
        padding: .4em .6em;
        background-color: ${props => props.theme.scdLt};
        border: 1px solid ${props => props.theme.prmDk};
        outline: none;
    }
`

export {Textarea}