import { Label, Textarea, Input, FlexSection } from '../../../common'

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
  <FlexSection {...props.wrapperProps} fullWidth column alignStart key={props.key}>
    {!props.labelHidden && <Label htmlFor={name}>{props.labelText || name}</Label>}
    <Textarea 
      id={name}
      name={name}
      {...!props.forwardRegister && props.register(name, props.registerOptions)} 
      {...props.forwardRegister && { register: props.register }}
      {...props.type==='hidden' && { as: Input }}
      {...props}
    />
    {errors && errors[name] && <p>{errors[name].message}</p>}
  </FlexSection>
)

export default ComplexInput