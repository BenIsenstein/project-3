import styled, {css} from 'styled-components'

const FormSectionTitle = styled.span`
    font-weight: bold;
    color: ${props => props.theme.titleColor}

    ${props => props.margin && css`
        margin: 1em 0;
    `}
`

export {FormSectionTitle}