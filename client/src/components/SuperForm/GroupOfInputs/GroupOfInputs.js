import { Fragment } from 'react'
import { FlexSection, GridSection, Label, Select } from '../../../common'
import { useIsDateInput } from '../../../functions'
import DatetimePickerModal from '../../Modals/DatetimePickerModal'
import ComplexInput from '../ComplexInput/ComplexInput'

// all props not in the component code are passed to the outside FlexSection.
// by default the FlexSection will behave as a row, but any FlexSection props 
// can be applied to format the input group

const GroupOfInputs = ({
  inputs, 
  isAddMode,
  isDetailsMode,
  isDetailsView,
  isEditView,
  register,
  setValue,
  errors,
  ...props }) => {
  // - - - - - - hooks/variables - - - - - - - //
  const isDateInput = useIsDateInput()
  const modeAndView = {
    isAddMode,
    isDetailsMode,
    isDetailsView,
    isEditView
  }
  const formTools = {
    register,
    setValue,
    errors
  }

  // - - - - - - - RETURN JSX - - - - - - - - //
  return <GridSection fullWidth {...props}>
    {inputs && inputs.map(({ name, readOnly, ...rest }) => {
      // every input other than date-types
      if (!isDateInput(name)) return ( 
        <ComplexInput 
          key={name}
          name={name}
          readOnly={isDetailsMode ? (isDetailsView || readOnly) : readOnly}
          {...formTools}
          {...modeAndView}
          {...rest} 
        />
      )
        
      // date-type input
      return (isDetailsMode && isDetailsView) || readOnly
        ? <ComplexInput 
          key={name} 
          name={name}
          readOnly 
          {...formTools} 
          {...modeAndView}
          {...rest}
        />  
        : <Fragment key={name}>
          <Label htmlFor={name}>
            {rest.labelText || name}
          </Label>
          <FlexSection fullWidth>
            <ComplexInput
              labelHidden
              name={name}        
              {...formTools}
              {...modeAndView}
              {...rest}
            />
            <DatetimePickerModal 
              setValue={setValue} 
              openModalWithNewDate={rest.openModalWithNewDate}
              modalTitle={rest.modalTitle || "set " + name}
              nameForUpdate={name} 
              margin="0 0 0 5px"
              iconButton 
            />
          </FlexSection>
        </Fragment>
    })}
  </GridSection>
}

const GroupOfCheckboxes = ({
  inputs, 
  isAddMode,
  isDetailsMode,
  isDetailsView,
  isEditView,
  register,
  setValue,
  errors,
  ...props }) => {
  // - - - - - - hooks/variables - - - - - - - //
  const modeAndView = {
    isAddMode,
    isDetailsMode,
    isDetailsView,
    isEditView
  }
  const formTools =  {
    setValue, 
    register,
    errors
  }
  
  // - - - - - - - RETURN JSX - - - - - - - - //
  return <GridSection fullWidth {...props}>
    {inputs && inputs.map(({ readOnly, ...rest }, index) => 
      <ComplexInput 
        key={index}
        name={props.name}
        type="checkbox"
        readOnly={isDetailsMode ? (isDetailsView || readOnly) : readOnly}
        {...formTools}
        {...modeAndView}
        {...rest} 
      />
    )}
  </GridSection>
}

const SuperFormSelect = ({ options, name, ...props }) => {
  return <>
    <Select 
      name={name} 
      id={name} 
      {...props.register(name, props.registerOptions)} //wait and see if it registers, since Select is a native element.
    >
      {options && options.map(({ value, optionText }) => <option value={value}>{optionText || value}</option> )}
    </Select>
  </>
}

export default GroupOfInputs
export { GroupOfCheckboxes, SuperFormSelect }