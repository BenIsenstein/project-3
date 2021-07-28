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

const ComplexInput = ({ name, errors, register, forwardRegister, forwardErrors, ...props }) => {
  const isCheckbox = props.type==='checkbox'
  const ifCheckboxValueElseName = isCheckbox ? props.value : name

  return <FlexSection {...props.wrapperProps} fullWidth column alignStart key={props.key}>

    {!props.labelHidden && 
      <Label htmlFor={ifCheckboxValueElseName}>{props.labelText || ifCheckboxValueElseName}</Label>
    }

    <Textarea 
      id={ifCheckboxValueElseName}
      name={name}
      {...!forwardRegister && register && register(name, props.registerOptions)} 
      {...forwardRegister && register && { register }}
      {...forwardErrors && errors && { errors }}
      {...props.type && { as: Input }}
      {...props}
    />

    {!forwardErrors && errors && <p>{errors[name]?.message}</p>}

  </FlexSection>
}

export default ComplexInput