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

- the 'name' attribute of each input must match the attribute as it appears in the Mongoose model
- other than the crucial 'name' prop, inputs can take any regular html 
  attributes as well as some custom ones:

some important input props:
- readOnly | bool | default: false |
- as | str, React component | default: undefined | https://styled-components.com/docs/api#as-polymorphic-prop
- labelText | str | default: this.name |
- registerOptions | object | default: undefined | https://react-hook-form.com/api/useform/register

- - - - - - - - - - - - - - - - - - - - - - - - -

- BeforeTemplate | JSX | default: undefined |
- AfterTemplate | JSX | default: undefined  |
- onSubmit | func | default: alert('No onSubmit given to <FormTemplate />') | called on submit event of the main <Form /> element
- formMode | str | default: 'add' | can be either 'add' or 'details'
- titleText | str | default: null | Appears just below the back button, above the inputs
- titleTag | str, React component | default: <P></P> | Can make the title of the template into any native html element, or a React component.

- ADD MODE:
  *  addModeCancel | func | default: history.push('/') | a customizable function that fires on clicking the 'cancel' button. 

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
  const goHome = useMemo(() => () => history.push('/'), [history])
  const { register, formState: { errors }, handleSubmit, setValue, reset, watch } = useForm({})

  // - - - - - - - - Details mode hooks - - - - - - - - - - -
  const { id } = useParams() 
  const [areDetailsLoaded, setAreDetailsLoaded] = useState(false)

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

  // Set default onSubmit if none has been given
  onSubmit = onSubmit || (() => alert('No onSubmit given to <FormTemplate />'))

  // Define some conditions for convenience
  const isAddMode = formMode === 'add'
  const isDetailsMode = formMode === 'details'
  const isEditView = viewMode === 'edit'
  const isDetailsView = viewMode === 'details'

  // An array of the names of all inputs that are meant to select a date
  const dateInputNames = useMemo(() => ['date', 'dateCompleted', 'dateSignedUp'], [])
  const isDateInput = name => dateInputNames.includes(name)

  // If the form is in 'add' mode, add the user's _id to the form data 
  if (isAddMode) register('userid', { value: user_id })
  
  // Effect to conditionally bring in entry and populate fields
  useEffect(() => {
    if (!isDetailsMode) return
    
    let isMounted = true 
    const getEntry = async () => {
      try {
        let valuesForReset = {}
        let detailsRes
        let details
        
        // fetch details
        if (isMounted) {
          detailsRes = await fetch(props.detailsUrl)
          details = await detailsRes.json()
        }

        // ensure that the value of date-type inputs are made into Date objects
        for (let dateInput of dateInputNames) if (details[dateInput]) details[dateInput] = new Date(details[dateInput])

        // for each input, setValue + add the value to valuesForReset
        for (let { name } of inputs) {
          setValue(name, details[name])
          valuesForReset[name] = details[name]
        }

        if (isMounted) {
          setResetValues(valuesForReset)
          setAreDetailsLoaded(true)
        }
      }
      catch(err) {
        console.log(err)
        alert("There as an error loading your details. We're working on it as fast as we can.")
        goHome()
      }   
    }
    getEntry()

    return () => isMounted = false
  }, [
    isDetailsMode, 
    props.detailsUrl, 
    inputs, 
    setAreDetailsLoaded, 
    setValue, 
    dateInputNames, 
    goHome
  ])

  // Effect to conditionally control the value of 'hasBeenChanged'
  // It won't render infinitely, the logic at the end prevents it.
  useEffect(() => {
    if (!isDetailsMode) return

    let currentValues = {}
    
    for (let { name } of inputs) currentValues[name] = watch(name)

    let doEntriesMatch = Object.keys(resetValues).every(key => 
      key === 'date' 
        ? resetValues[key]?.toString() === currentValues[key]?.toString() 
        : resetValues[key] === currentValues[key]
    )

    if (!hasBeenChanged) if (!doEntriesMatch) setHasBeenChanged(true)
    if (hasBeenChanged) if (doEntriesMatch) setHasBeenChanged(false)
  })

  // - - - - - - RETURN JSX- - - - - - - - - - - //

  if (isDetailsMode && !areDetailsLoaded) return "Loading..." 

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
        {!props.displayOnly && isDetailsMode && 
        <PencilIcon onClick={() => setViewMode(isEditView ? 'details' : 'edit')} />}                    
      </FlexSection>
      
      <Form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>   
        {inputs && inputs.map(({ name, readOnly, ...rest }) => {
          // every input other than 'date'
          if (!isDateInput(name)) return <ComplexInput 
            key={name}
            name={name}
            readOnly={isDetailsMode ? (isDetailsView || readOnly) : readOnly}
            register={register}
            errors={errors} 
            {...rest} 
          />
          
          // 'date' input
          return (isDetailsMode && isDetailsView) || readOnly
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