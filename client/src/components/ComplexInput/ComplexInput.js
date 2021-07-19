import React from 'react'
import { Label, Textarea, Input } from '../../common'
import ToggleVisibleInput from '../ToggleVisibleInput/ToggleVisibleInput'

/* 
other props might include:
- labelText="Description longer than name." 
- as={CustomComponent} | as='div'
- type='hidden' | type='file'
- toggleVisible
- maxLength
- detailedPage
- readOnly
*/

const ComplexInput = ({ name, errors, ...props }) => (
  <React.Fragment key={props.key}>
    {!props.labelHidden && <Label htmlFor={name}>{props.labelText || name}</Label>}
    <Textarea 
      id={name}
      name={name}
      {...!props.toggleVisible && props.register(name, props.registerOptions)} 
      {...props.toggleVisible && { as: ToggleVisibleInput, register: props.register }}
      {...props.type==='hidden' && { as: Input }}
      {...props}
    />
    {errors && errors[name] && <p>{errors[name].message}</p>}
  </React.Fragment>
)

export default ComplexInput