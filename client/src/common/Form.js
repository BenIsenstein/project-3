import styled, {css} from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${props => props.theme.prm};
`

export {Form}