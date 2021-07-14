import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import UserContext from '../UserContext'
import { Page, PageContainer, BackIcon, PencilIcon, Form, Button, Label, Input, Textarea, StyledDateTimePicker, FlexSection } from '../common'
import ComplexInput from './ComplexInput/ComplexInput'
import DeleteEntryButton from './DeleteEntryButton'

/* 
NOTES
- the 'name' attribute of each input must match the attribute as it appears in the Mongoose model.
- the inputs array is veryimportant. it needs this structure:

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

- The optional BeforeTemplate and AfterTemplate props must be React components
- onSubmit is required as a prop to do anything useful.
- mode can be either 'details' or 'add'
- DETAILS MODE:
  * detailsUrl is crucial to fetch the details dynamically.
*/

const FormTemplate = ({ 
  formMode, 
  BeforeTemplate,
  AfterTemplate,
  onSubmit, 
  inputs, 
  ...props }) => {
  // - - - - - - - - Hooks common to both modes - - - - - - - 
  const history = useHistory()
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
  // Define some conditions for convenience
  const isAddMode = formMode === 'add'
  const isDetailsMode = formMode === 'details'
  const isEditView = viewMode === 'edit'
  const isDetailsView = viewMode === 'details'

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

        // ensure that details.date is a Date object
        if (details.date) details.date = new Date(details.date)
         
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
  }, [isDetailsMode, props.detailsUrl, inputs, setRefresh, setValue])

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

  if (isDetailsMode && !refresh) return null 

  return <>
    {BeforeTemplate && <BeforeTemplate />} 

    {isDetailsMode && 
      <Button type='button' onClick={() => history.push('/calendar')}>
        <BackIcon />Calendar
      </Button>
    }

    <FlexSection spaceBetween>
      <p>{props.titleText || "Temporary Title"}</p>
      {isDetailsMode && <PencilIcon onClick={() => setViewMode('edit')} />}                    
    </FlexSection>
    
    <Form 
      onSubmit={handleSubmit(async (data) => onSubmit 
        ? await onSubmit(data) 
        : alert('No onSubmit given to <FormTemplate />'))
      }
    >   
      {inputs.map(({ name, ...rest }) => {
        // every input other than 'date'
        if (name!=='date') return <ComplexInput 
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
            value={watch(name)} 
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
          <Button fullWidth important type='submit' value='submit'>Save</Button>
          <Button fullWidth type='button' onClick={() => isAddMode ?  history.goBack() : resetForm()}>Cancel</Button>                              
        </FlexSection>
      }
    </Form>  

    {isDetailsMode && isDetailsView && 
      <FlexSection marginTop1em>
        <DeleteEntryButton fullWidth entryId={id} /> 
      </FlexSection>
    }

    {AfterTemplate && <AfterTemplate />} 
  </>
}


export default FormTemplate