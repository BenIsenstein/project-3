import { Form, Button, Label, Input, Textarea, StyledDateTimePicker, FlexSection } from '../common'

/* 
other props might include: 
- as={Textarea}
- type='hidden'
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



