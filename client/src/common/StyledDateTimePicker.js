import styled, {css} from 'styled-components'
import DateTimePicker from 'react-datetime-picker'

const StyledDateTimePicker = styled(DateTimePicker)`
    width: 100%;
    min-height: 1.8em;
    padding: .4em .6em;
    font-family: inherit;
    font-size: 1em;
    color: ${props => props.theme.contentColor};
    border: 1px solid ${props => props.theme.prm};
    border-radius: 6px;
    outline: none;

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

export {StyledDateTimePicker}