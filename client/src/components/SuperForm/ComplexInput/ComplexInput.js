import { Label, Textarea, Input, FlexSection, Error } from '../../../common'

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
  isCustomComponent, 
  forwardErrors, 
  type, 
  wrapperProps,
  ...props 
  }) => {
  const isCheckbox = type==='checkbox'
  const ifCheckboxValueElseName = isCheckbox ? props.value : name

  //console.log('checkedAll, setCheckedAll, checked, setChecked: ', props.checkedAll, props.setCheckedAll,props.checked,props.setChecked)

  return (
    <FlexSection 
      key={props.key}
      gridColumn={wrapperProps?.gridColumn || "1/-1"}
      fullWidth={!wrapperProps?.noFullWidth} 
      column={!wrapperProps?.noColumn} 
      {...isCheckbox ? {alignCenter: true} : {alignStart: true}}
      {...wrapperProps}
    >
  
      {!props.labelHidden && 
        <Label htmlFor={ifCheckboxValueElseName} {...isCheckbox && {margin: '0'}}>
          {props.labelText || ifCheckboxValueElseName}
        </Label>
      }
  
      <Textarea 
        id={ifCheckboxValueElseName}
        name={name}
        {...!isCustomComponent && register && register(name, props.registerOptions)} 
        {...isCustomComponent && register && { register }}
        {...forwardErrors && errors && { errors }}
        {...type && { as: Input, type }}
        {...props}
      />
  
      {!forwardErrors && errors && <Error>{errors[name]?.message}</Error>}
  
    </FlexSection>
  )
}

export default ComplexInput