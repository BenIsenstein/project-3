import { FlexSection, GridSection, Input, Select } from '../../../common'
import { useIsDateInput } from '../../../functions'
import DatetimePickerModal from '../../Modals/DatetimePickerModal'
import ComplexInput from '../ComplexInput/ComplexInput'

// all props not in the component code are passed to the outside GridSection.

const GroupOfInputs = ({
  inputs, 
  isAddMode,
  isDetailsMode,
  isDetailsView,
  isEditView,
  register,
  setValue,
  watch,
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
    watch,
    errors
  }

  // - - - - - - - RETURN JSX - - - - - - - - //
  return <GridSection fullWidth {...props}>
    {inputs && inputs.map(({ name, readOnly, ...rest }, index) => {
      // every input other than date-types
      if (!isDateInput(name)) return ( 
        <ComplexInput 
          key={index}
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
          key={index} 
          name={name}
          readOnly 
          {...formTools} 
          {...modeAndView}
          {...rest}
        />  
        : (
          <FlexSection 
            key={index} 
            gridColumn={rest.wrapperProps?.gridColumn || "1/5"} 
            {...rest.wrapperProps} 
            fullWidth
          >
            <ComplexInput
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
        )
    })}
  </GridSection>
}

const GroupOfCheckboxes = ({
  // GroupOfCheckboxes needs to have 'isCustomComponent' set to true
  inputs, 
  isAddMode,
  isDetailsMode,
  isDetailsView,
  isEditView,
  register,
  setValue,
  watch,
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
    watch,
    errors
  }
  
  // - - - - - - - RETURN JSX - - - - - - - - //
  return <GridSection fullWidth {...props}>
    {inputs && inputs.map(({ readOnly, ...rest }, index) => 
      <ComplexInput 
        noFullWidth
        key={index}
        name={props.name}
        type="checkbox"
        checked
        readOnly={isDetailsMode ? (isDetailsView || readOnly) : readOnly}
        registerOptions={props.registerOptions}
        wrapperProps={{rowReverse: true, justifyEnd: true}}
        {...formTools}
        {...modeAndView}
        {...rest} 
      />
    )}
  </GridSection>
}

const SuperFormSelect = ({ options, name, ...props }) => { 
  // *SuperFormSelect needs to have "isCustomComponent" set to true.*
  const allProps = {
    name: name,
    id: name,
    ...props.register(name, props.registerOptions), 
    ...props
  }
  
  if (!options) return null
  if (props.readOnly) return <Input {...allProps} />

  return <>
    <Select {...allProps}>
      {options.map(({ value, optionText }) => <option value={value} key={value}>{optionText || value}</option> )}
    </Select>
  </>
}

export default GroupOfInputs
export { GroupOfCheckboxes, SuperFormSelect }