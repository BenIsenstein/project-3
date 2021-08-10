import { Fragment, useState, useEffect, useMemo } from 'react'
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

  useEffect(() => {
    return () => console.log('GroupOfInputs unmounted!')
  }, [])

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
  useEffect(() => console.log("customItems: ", customItems), [customItems])

  const [allDefaultTasks, setAllDefaultTasks] = useState([])
  const [allCustomTasks, setAllCustomTasks] = useState([])
  const fullTaskList = useMemo(() => [...allDefaultTasks, ...allCustomTasks], [allDefaultTasks, allCustomTasks])

  useEffect(() => console.log("allDefaultTasks: ", allDefaultTasks), [allDefaultTasks])
  useEffect(() => console.log("allCustomTasks: ", allCustomTasks), [allCustomTasks])
  useEffect(() => console.log("fullTaskList: ", fullTaskList), [fullTaskList])

  useEffect(() => {
    const getAllInfo = async () => {
      console.log('calling getAllInfo')
      try {
        let response = await fetch("/api/info")
        let allTasksArray = await response.json()
        setAllDefaultTasks(allTasksArray)
      }
      catch (err) {
        console.log("There was an error loading your table", err)
      }
    }

    getAllInfo()

    return () => console.log("getAllInfo effect - unmounting!")
  }, [])
  
  const GroupOfCheckboxes = ({
    // GroupOfCheckboxes needs to have 'isCustomComponent' set to true
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

    const allInputs = useMemo(() => [...inputs, ...customItems], [inputs])
    const isAddingOrEditing = isAddMode || isEditView

    // declare checkbox names such that their data ends up in an object, 
    // accessible with the name of the parent <GroupOfCheckboxes />
    const DefaultCheckbox = ({ readOnly, name, ...rest }) => <ComplexInput 
      noFullWidth
      name={`${groupName}.${name}`}
      labelText={name}
      type="checkbox"
      readOnly={isDetailsMode ? (isDetailsView || readOnly) : readOnly}
      wrapperProps={{rowReverse: true, justifyEnd: true}}
      {...formTools}
      {...modeAndView}
      {...rest} 
    />

    const DefaultCheckboxAndTasks = (rest) => {
      const isBoxChecked = watch(`${groupName}.${rest.name}`)

      return <Fragment key={rest.index}>
        <DefaultCheckbox {...rest} name={rest.name} /> 
        {isBoxChecked && 
        <FlexSection gridColumn="1/-1">
          <FlexSection margin="0 0 0 15px">
            {fullTaskList
              .filter(task => task.item === rest.name)
              .map((task, index) => <Li margin="0 20px 0 0" key={index}>{task.task}: {task.frequency} days</Li>)
            }
          
          </FlexSection>
        </FlexSection>
        }
      </Fragment>
    }

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
              setAllCustomTasks(prevState => prevState.map(task => task.item === name ? { ...task, item: editedItem } : task))
            }}
          />
          <DeleteItemModal 
            {...rest}
            name={name}
            actionOnConfirm={() => {
              setCustomItems(prevState => prevState.filter(item => item.name !== name))
              setAllCustomTasks(prevState => prevState.filter(task => task.item !== name))
            }}
          />
        </FlexSection>
      </FlexSection>
    }

    const CustomCheckboxAndTasks = (rest) => {
      const isBoxChecked = watch(`${groupName}.${rest.name}`)

      return <Fragment key={rest.index}>
        <CustomItemCheckbox {...rest} name={rest.name} /> 
        {isBoxChecked && 
        <FlexSection gridColumn="1/-1">
          <FlexSection margin="0 0 0 15px">
            {fullTaskList
              .filter(task => task.item === rest.name)
              .map((task, index) => <Li margin="0 20px 0 0" key={index}>{task.task}: {task.frequency} days</Li>)
            }
          </FlexSection>
        </FlexSection>
        }
      </Fragment>
    }

    const AddCustomItemModal = () => {
      const [newItem, setNewItem] = useState()
      const [newTask, setNewTask] = useState()
      const [newFrequency, setNewFrequency] = useState()
  
      return <CustomItemModal 
        modalContent={<>
          <p>New item</p>
          <ComplexInput required labelText="item" {...modeAndView} onChange={event => setNewItem(event.target.value)} />
          <ComplexInput required labelText="task" {...modeAndView} onChange={event => setNewTask(event.target.value)} />
          <ComplexInput required labelText="frequency (days)" type="number" {...modeAndView} onChange={event => setNewFrequency(event.target.value)} />
        </>}
        actionOnConfirm={() => {
          setCustomItems(prevState => [...prevState, { name: newItem, isCustomItem: true }])
          setValue(`${groupName}.${newItem}`, true)
          setAllCustomTasks(prevState => [...prevState, { item: newItem, task: newTask, frequency: newFrequency }])
        }}
      />
    }

    const AddCustomTaskModal = () => {
      const [newItem, setNewItem] = useState()
      const [newTask, setNewTask] = useState()
      const [newFrequency, setNewFrequency] = useState()
  
      return <CustomItemModal 
        confirmPrompt="add task"
        buttonText="add your own task"
        modalContent={<>
          <p>New task</p>
          <ComplexInput name="item" {...modeAndView} 
            as={() => 
              <Select value={newItem} onChange={event => setNewItem(event.target.value)}>
                {allInputs.map(({ name }) => <option value={name} key={name}>{name}</option> )}
              </Select>
            }
          />
          <ComplexInput required name="task" {...modeAndView} onChange={event => setNewTask(event.target.value)} />
          <ComplexInput required name="frequency (days)" type="number" {...modeAndView} onChange={event => setNewFrequency(event.target.value)} />
        </>}
        actionOnConfirm={() => {
          setAllCustomTasks(prevState => [...prevState, { item: newItem, task: newTask, frequency: newFrequency }])
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
            ? <CustomCheckboxAndTasks index={index} {...input} />
            : <DefaultCheckboxAndTasks index={index} {...input} />
        )}
      </GridSection>

      {allCustomTasks.map((task, index) => 
        <Fragment key={index}>
          <ComplexInput name={`customTasks.${index}.item`} labelHidden type="hidden" value={task.item} {...formTools} {...modeAndView} />
          <ComplexInput name={`customTasks.${index}.task`} labelHidden type="hidden" value={task.task} {...formTools} {...modeAndView} />
          <ComplexInput name={`customTasks.${index}.frequency`} labelHidden type="hidden" value={task.frequency} {...formTools} {...modeAndView} />
        </Fragment>
      )}
      
      {isAddingOrEditing && <AddCustomItemModal />}
      {isAddingOrEditing && <AddCustomTaskModal />}
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
  
  if (props.readOnly) return <Input {...allProps} />

  return <>
    <Select {...allProps}>
      {options && options.map(({ value, optionText }) => <option value={value} key={value}>{optionText || value}</option> )}
    </Select>
  </>
}

export default GroupOfInputs
export { useGroupOfCheckboxes, SuperFormSelect }