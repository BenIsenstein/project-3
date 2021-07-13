import React from 'react'
import { Form, Button, Label, Input, Textarea, StyledDateTimePicker, FlexSection } from '../common'

/* 
other props might include:
- labelText="Description longer than inputName." 
- as={CustomComponent} | as='div'
- type='hidden' | type='file'
- maxLength
- detailedPage
- readOnly
*/

const ComplexInput = ({ inputName, errors, ...props }) => (
  <React.Fragment key={props.key}>
    <Label htmlFor={inputName}>{props.labelText || inputName}</Label>
    <Input 
      id={inputName}
      name={inputName}  
      {...props}
    />
    {errors[inputName] && <p>{errors[inputName].message}</p>}
  </React.Fragment>
)

export default ComplexInput



