import styled, {css} from 'styled-components'

const Form = styled.form`
  display: flex;
  align-items: center;
  margin: 0.2em 0;
  padding: 0.4em 1em;
  font-size: 0.8em;
  background-color: ${props => props.theme.scdLt};
  color: ${props => props.theme.prm};
`

export {Form}