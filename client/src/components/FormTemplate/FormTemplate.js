import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import UserContext from '../../UserContext'
import { BackIcon, PencilIcon, Form, P, Button, StyledDateTimePicker, FlexSection } from '../../common'
import ComplexInput from '../ComplexInput/ComplexInput'
import DeleteEntryButton from '../DeleteEntryButton'
import './FormTemplate.css'

/* 
NOTES
FormTemplate is a dynamic form component wrapped in a FlexSection
Other JSX components can be added before and after the main template and remain within this component

- - - - - - - - - - - inputs | arr | default: undefined | - - - - - - - - - - - - - -
- the 'name' attribute of each input must match the attribute as it appears in the Mongoose model
- the inputs array is very important. it needs this structure:

const inputs = [
  {
    name: "item",
    registerOptions: { required: "You must choose an item." },
    labelText: "",
    maxLength: '50'
  },
  {
    name: "task",
    registerOptions: { required: "You must choose a task." },
    labelText: "Custom label text",
    maxLength: '50'
  }
]

- - - - - - - - - - - - - - - - - - - - - - - - -

- BeforeTemplate | JSX | default: undefined |
- AfterTemplate | JSX | default: undefined  |
- onSubmit | func | default: alert('No onSubmit given to <FormTemplate />') | called on submit event of the main <Form /> element
- formMode | str | default: 'add' | can be either 'add' or 'details'
- titleText | str | default: null | Appears just below the back button, above the inputs
- titleTag | str, React component | default: <P></P> | Can make the title of the template into any native html element, or a React component.

- ADD MODE:
  *  addModeCancel | func | default: history.push('/') | is a customizable function that fires on clicking the 'cancel' button. 

- DETAILS EDIT VIEW or ADD MODE:
  * submitText | str | default: "Save" | <Form /> 'submit' button at the bottom of the template
  * cancelText | str | default: "Cancel" | right next to the 'submit' button. default onCick is to cancel edit view, or take user to homepage from add mode. Can have a custom "addModeCancel" function
  
- DETAILS MODE:
  * detailsUrl | str | default: undefined | is crucial to fetch info for the template dynamically
  * displayOnly | bool | default: false | if true the PencilIcon disappears, meaning you can effectively have a read-only FlexSection 
  * noBackButton | bool | default: false | if true there will be no button at the top left of the template
  * backButtonIcon | JSX | default: <BackIcon /> |
  * backButtonText | str | default: undefined |
  * backButtonOnClick | func | default: history.push('/') | 
  * noDeleteButton | bool | default: false | if true there will be no <DeleteEntryButton /> at the very bottom of the template
*/

const FormTemplate = ({ 
  formMode, 
  BeforeTemplate,
  AfterTemplate,
  BackButtonIcon,
  onSubmit, 
  inputs, 
  ...props }) => {
  // - - - - - - - - Hooks common to both modes - - - - - - - 
  const history = useHistory()
  const goHome = () => history.push('/')
  const { register, formState: { errors }, handleSubmit, setValue, reset, watch } = useForm({})

  // - - - - - - - - Details mode hooks - - - - - - - - - - -
  const { id } = useParams() 
  const [refresh, setRefresh] = useState(null)

  // viewMode can be 'details' or 'edit'
  const [viewMode, setViewMode] = useState('details')
  
  // original values of the entry, for resetting, will be stored upon fetching
  const [resetValues, setResetValues] = useState({})
  const resetForm = () => {reset(resetValues); setViewMode('details')} 
  const [hasBeenChanged, setHasBeenChanged] = useState(false)

  // - - - - - - - - Add mode hooks - - - - - - - - - - - - -
  const userContext = useContext(UserContext)
  const user_id = userContext.user?._id || 'default'

  // - - - - Other effects/logic to prepare the form - - - - -
  // Set default formMode if none has been given
  formMode = formMode || 'add'

  // Define some conditions for convenience
  const isAddMode = formMode === 'add'
  const isDetailsMode = formMode === 'details'
  const isEditView = viewMode === 'edit'
  const isDetailsView = viewMode === 'details'

  // An array of the names of all inputs that are meant to select a date
  const dateInputNames = useMemo(() => ['date', 'dateCompleted'], [])

  // If the form is in 'add' mode, add the user's _id to the form data 
  if (isAddMode) register('userid', { value: user_id })
  
  // Effect to conditionally bring in entry and populate fields
  useEffect(() => {
    if (!isDetailsMode) return
      
    const getEntry = async () => {
      try {
        // fetch details
        let detailsRes = await fetch(props.detailsUrl)
        let details = await detailsRes.json()
        let valuesForReset = {}

        // ensure that date-type inputs are made into Date objects
        for (let dateInput of dateInputNames) {
          if (details[dateInput]) details[dateInput] = new Date(details[dateInput])
        }
         
        // set all inputs to blank
        //for (let { name } of inputs) setValue(name, name !== 'date' ? '...' : undefined)

        // for each input, setValue + add the value to valuesForReset
        for (let { name } of inputs) {
          setValue(name, details[name])
          valuesForReset[name] = details[name]
        }

        setResetValues(valuesForReset)
        setRefresh({})
      }
      catch(err) {
        console.log(err)
        alert("There as an error loading your details. We're working on it as fast as we can.")
      }   
    }
      getEntry()
  }, [isDetailsMode, props.detailsUrl, inputs, setRefresh, setValue, dateInputNames])

  // Effect to conditionally control the value of 'hasBeenChanged'
  useEffect(() => {
    if (!isDetailsMode) return

    let currentValues = {}
    for (let { name } of inputs) currentValues[name] = watch(name)

    let doEntriesMatch = Object.keys(resetValues).every(key => 
      key === 'date' 
        ? resetValues[key]?.toString() === currentValues[key]?.toString() 
        : resetValues[key] === currentValues[key]
    )
    
    if (doEntriesMatch) {
      setHasBeenChanged(false)
    }
    else {
      setHasBeenChanged(true)
    }
  }, [inputs, watch, resetValues, isDetailsMode])

  // - - - - - - RETURN JSX- - - - - - - - - - - //

  if (isDetailsMode && !refresh) return null 

  return (
    <FlexSection fullWidth column fadeIn {...props}>
      {BeforeTemplate && <BeforeTemplate />} 
  
      {!props.noBackButton && isDetailsMode && 
        <Button 
          type='button' 
          alignSelfStart 
          onClick={props.backButtonOnClick || goHome}
        >
          {(BackButtonIcon && <BackButtonIcon />) || <BackIcon />}
          {props.backButtonText}
        </Button>
      }
  
      <FlexSection fullWidth spaceBetween>
        <P as={props.titleTag}>{props.titleText}</P>
        {!props.displayOnly && isDetailsMode && <PencilIcon onClick={() => setViewMode('edit')} />}                    
      </FlexSection>
      
      <Form 
        onSubmit={handleSubmit(async (data) => onSubmit 
          ? await onSubmit(data) 
          : alert('No onSubmit given to <FormTemplate />'))
        }
      >   
        {inputs && inputs.map(({ name, ...rest }) => {
          // every input other than 'date'
          if (!dateInputNames.includes(name)) return <ComplexInput 
            key={name}
            name={name}
            readOnly={isDetailsMode ? isDetailsView : rest.readOnly}
            register={register}
            errors={errors} 
            {...rest} 
          />
          
          // 'date' input
          return (isDetailsMode && isDetailsView)
            ? <ComplexInput 
              key={name} 
              name={name}
              readOnly 
              register={register} 
              {...rest}
            />  
            : <ComplexInput
              key={name} 
              name={name}
              as={StyledDateTimePicker}          
              register={register}
              onChange={val => setValue(name, val)}
              value={watch(name)}
              errors={errors}
              {...rest}
            />
        })}
  
        {(isAddMode || isEditView) && 
          <FlexSection fullWidth marginTop1em>
            <Button fullWidth important type='submit' value='submit'>
              {props.submitText || "Save"}
            </Button>
            <Button fullWidth type='button' onClick={isEditView ? resetForm : props.addModeCancel || goHome}>
              {props.cancelText || "Cancel"}
            </Button>                              
          </FlexSection>
        }
      </Form>  
  
      {!props.noDeleteButton && isDetailsMode && isDetailsView && 
        <FlexSection fullWidth justifyEnd marginTop1em>
          <DeleteEntryButton entryId={id} /> 
        </FlexSection>
      }
  
      {AfterTemplate && <AfterTemplate />} 
    </FlexSection>
)}


export default FormTemplate