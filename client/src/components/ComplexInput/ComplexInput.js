import React from 'react'
import { Label, Input } from '../../common'

/* 
other props might include:
- labelText="Description longer than name." 
- as={CustomComponent} | as='div'
- type='hidden' | type='file'
- maxLength
- detailedPage
- readOnly
*/

const ComplexInput = ({ name, errors, ...props }) => (
  <React.Fragment key={props.key}>
    <Label htmlFor={name}>{props.labelText || name}</Label>
    <Input 
      id={name}
      name={name}
      {...props.register(name, props.registerOptions)}
      {...props}
    />
    {errors && errors[name] && <p>{errors[name].message}</p>}
  </React.Fragment>
)

export default ComplexInput



