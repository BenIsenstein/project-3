import { useState, useEffect } from 'react'
import { FlexSection, GridSection, Input, Select, Li } from '../../common'
import { useIsDateInput } from '../../functions'
import { DeleteItemModal, EditItemModal } from '../Modals/CustomItemModal'
import DatetimePickerModal from '../Modals/DatetimePickerModal'
import ComplexInput from './ComplexInput'

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
  getValues,
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
    errors,
    getValues
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
  // GroupOfCheckboxes needs to have 'isCustomComponent' set to false?
  inputs, 
  isAddMode,
  isDetailsMode,
  isDetailsView,
  isEditView,
  register,
  setValue,
  watch,
  errors,
  getValues,
  customItems,
  setCustomItems,
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
    errors,
    getValues
  }


  useEffect(() => console.log("customItems: ", customItems), [customItems])

  const checkboxChange = e => {
    let target = e.target
    console.log('checkbox event: ', e)
    console.log('e.target: ', target)
    console.log('target.value: ', target.value)
    console.log('getValues()', getValues())
    console.log('target.checked: ', target.checked)
  }

  const DefaultCheckbox = ({ readOnly, name, ...rest }) => <ComplexInput 
    noFullWidth
    key={rest.index}
    name={`${props.name}.${name}`}
    labelText={name}
    type="checkbox"
    onChange={checkboxChange}
    //defaultChecked={watch(`${props.name}.${name}`)}
    readOnly={isDetailsMode ? (isDetailsView || readOnly) : readOnly}
    wrapperProps={{rowReverse: true, justifyEnd: true}}
    {...formTools}
    {...modeAndView}
    {...rest} 
  />

  const CustomItemCheckbox = ({ wrapperProps, name, ...rest }) => {
    const [editedItem, setEditedItem] = useState()

    return setCustomItems && (
      <FlexSection gridColumn="1/2" {...wrapperProps}>
        <DefaultCheckbox {...rest} name={name} />
        <FlexSection>
          <EditItemModal 
            modalContent={<>
              <p>Editing {rest.labelText || name}</p>
              <ComplexInput onChange={event => setEditedItem(event.target.value)}/>
            </>}
            actionOnConfirm={() => 
              setCustomItems(customItems.map(item => item.name === name ? { ...item, name: editedItem } : item))
            }
          />
          <DeleteItemModal 
            {...rest}
            actionOnConfirm={() => 
              setCustomItems(customItems.filter(item => item.name !== name))
            }
          />
        </FlexSection>
      </FlexSection>
    )
  }
  
  // - - - - - - - RETURN JSX - - - - - - - - //
  return <GridSection fullWidth {...props}>
    {inputs && inputs.map((input, index) => (props.readOnly || input.readOnly)
      ? watch(`${props.name}.${input.name}`) && <Li gridColumn="1/2" key={index}>{input.name}</Li>
      : input.isCustomItem 
        ? <CustomItemCheckbox index={index} {...input} /> 
        : <DefaultCheckbox index={index} {...input} />
    )}
  </GridSection>
}

const SuperFormSelect = ({ options, name, ...props }) => { 
  // *SuperFormSelect needs to have "isCustomComponent" set to true.*
  const allProps = {
    ...props.register(name, props.registerOptions), 
    ...props,
    name: name,
    id: name
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