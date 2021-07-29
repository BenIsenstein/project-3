import { Label, Textarea, Input, FlexSection } from '../../../common'

/* 
other props might include:
- labelText="Description longer than name." 
- as={CustomComponent} | as='div'
- type='hidden' | type='file'
- toggleVisible
- maxLength
- detailedPage
- noFullWidth
- readOnly
*/

const ComplexInput = ({ 
  name, 
  errors, 
  register, 
  forwardRegister, 
  forwardErrors, 
  type, 
  wrapperProps,
  ...props 
  }) => {
  const ifCheckboxValueElseName = type==='checkbox' ? props.value : name

  return (
    <FlexSection 
      key={props.key}
      gridColumn={wrapperProps?.gridColumn || "1/5"}
      fullWidth={!props.noFullWidth} 
      column 
      alignStart 
      {...wrapperProps}
    >
  
      {!props.labelHidden && 
        <Label htmlFor={ifCheckboxValueElseName}>
          {props.labelText || ifCheckboxValueElseName}
        </Label>
      }
  
      <Textarea 
        id={ifCheckboxValueElseName}
        name={name}
        {...!forwardRegister && register && register(name, props.registerOptions)} 
        {...forwardRegister && register && { register }}
        {...forwardErrors && errors && { errors }}
        {...type && { as: Input, type }}
        {...props}
      />
  
      {!forwardErrors && errors && <p>{errors[name]?.message}</p>}
  
    </FlexSection>
  )
}

export default ComplexInput