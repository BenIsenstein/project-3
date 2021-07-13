import { Form, Button, Label, Input, Textarea, StyledDateTimePicker, FlexSection } from '../common'

/* 
other props might include:
- labelText="Description longer than inputName." 
- as={CustomComponent} | as='div'
- type='hidden' | type=
- maxLength
- detailedPage
- readOnly
*/

const ComplexInput = ({ inputName, errors, ...props }) => <>
  <Label htmlFor={inputName}>{props.labelText || inputName}</Label>
  <Input 
    id={inputName}
    name={inputName}  
    {...props}
  />
  {errors[inputName] && <p>{errors[inputName].message}</p>}
</>

export default ComplexInput



