import { useState, useEffect } from 'react'
import { FlexSection, GridSection, Input, Select, Li, Button, AddIcon } from '../../common'
import { useIsDateInput } from '../../functions'
import CustomItemModal, { DeleteItemModal, EditItemModal } from '../Modals/CustomItemModal'
import DatetimePickerModal from '../Modals/DatetimePickerModal'
import ComplexInput from './ComplexInput'

// all props not in the component code are passed to the outside GridSection.

const GroupOfInputs = ({
  inputs, 
  isAddMode,
  isDetailsMode,
  isDetailsView,
  isEditView,
  areDetailsLoaded,
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
    isEditView,
    areDetailsLoaded
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


const useGroupOfCheckboxes = () => {
  const [customItems, setCustomItems] = useState([])

  const GroupOfCheckboxes = ({
    // GroupOfCheckboxes needs to have 'isCustomComponent' set to false?
    inputs, 
    isAddMode,
    isDetailsMode,
    isDetailsView,
    isEditView,
    areDetailsLoaded,
    register,
    setValue,
    watch,
    errors,
    getValues,
    name: groupName,
    ...props }) => {
    // - - - - - - hooks/variables - - - - - - - //
    const modeAndView = {
      areDetailsLoaded,
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

    const allInputs = [...inputs, ...customItems]
    const isAddingOrEditing = isAddMode || isEditView

    // declare checkbox names such that their data ends up in an object, 
    // accessible with the name of the parent <GroupOfCheckboxes />
    const DefaultCheckbox = ({ readOnly, name, ...rest }) => <ComplexInput 
      noFullWidth
      key={rest.index}
      name={`${groupName}.${name}`}
      labelText={name}
      type="checkbox"
      readOnly={isDetailsMode ? (isDetailsView || readOnly) : readOnly}
      wrapperProps={{rowReverse: true, justifyEnd: true}}
      {...formTools}
      {...modeAndView}
      {...rest} 
    />
  
    const CustomItemCheckbox = ({ wrapperProps, name, ...rest }) => {
      const [editedItem, setEditedItem] = useState()
  
      return <FlexSection gridColumn="1/2" {...wrapperProps}>
        <DefaultCheckbox {...rest} name={name} />
        <FlexSection>
          <EditItemModal 
            modalContent={<>
              <p>Editing {rest.labelText || name}</p>
              <ComplexInput {...modeAndView} onChange={event => setEditedItem(event.target.value)}/>
            </>}
            actionOnConfirm={() => {
              const valueOfPrevName = getValues(`${groupName}.${name}`)
              
              setCustomItems(prevState => prevState.map(item => item.name === name ? { ...item, name: editedItem } : item))
              setValue(`${groupName}.${editedItem}`, valueOfPrevName)
            }}
          />
          <DeleteItemModal 
            {...rest}
            name={name}
            actionOnConfirm={() => 
              setCustomItems(prevState => prevState.filter(item => item.name !== name))
            }
          />
        </FlexSection>
      </FlexSection>
    }

    const AddCustomItemModal = () => {
      const [newItem, setNewItem] = useState()
  
      return <CustomItemModal 
        modalContent={<>
          <p>New item</p>
          <ComplexInput {...modeAndView} onChange={event => setNewItem(event.target.value)} />
        </>}
        actionOnConfirm={() => {
          setCustomItems(prevState => [...prevState, { name: newItem, isCustomItem: true }])
          setValue(`${groupName}.${newItem}`, true)
        }}
      />
    }

    const CheckAllButton = () => (
      <Button text onClick={() => allInputs.forEach(input => setValue(`${groupName}.${input.name}`, true))}>
        <AddIcon sm />select all
      </Button>
    )
    
    // - - - - - - - RETURN JSX - - - - - - - - //
    return <>
      <GridSection fullWidth {...props}>
        {inputs && allInputs.map((input, index) => (props.readOnly || input.readOnly)
          ? watch(`${groupName}.${input.name}`) && <Li gridColumn="1/2" key={index}>{input.name}</Li>
          : input.isCustomItem 
            ? <CustomItemCheckbox index={index} {...input} /> 
            : <DefaultCheckbox index={index} {...input} />
        )}
      </GridSection>
      
      {isAddingOrEditing && <AddCustomItemModal />}
      {isAddingOrEditing && <CheckAllButton />}
    </>
  }

  return { 
    GroupOfCheckboxes,
    customItems,
    setCustomItems 
  }
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
export { useGroupOfCheckboxes, SuperFormSelect }