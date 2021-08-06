import { Label, Textarea, Input, FlexSection, Error } from '../../common'

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
  shouldRegisterParent,
  forwardErrors, 
  type, 
  wrapperProps,
  ...props 
  }) => {
  const isCheckbox = type === 'checkbox'

  return (
    <FlexSection 
      key={props.key}
      gridColumn={wrapperProps?.gridColumn || "1/-1"}                // gridColumn: "1/-1" unless specified otherwise
      fullWidth={!wrapperProps?.noFullWidth}                         // fullWidth unless specified otherwise
      column={!wrapperProps?.noColumn}                               // column unless specified otherwise
      {...isCheckbox ? {alignCenter: true} : {alignStart: true}}     // checkbox aligmnent
      {...wrapperProps}
    >
  
      {!props.labelHidden &&                                         // label can be hidden with labelHidden. 
        <Label htmlFor={name} {...isCheckbox && {margin: '0'}}>
          {props.labelText || name}
        </Label>
      }
  
      <Textarea 
        id={name}
        name={name}
        {...!isCustomComponent && register && register(name, !isCheckbox && props.registerOptions)}  // only apply registerOptions if it isn't a checkbox. 
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