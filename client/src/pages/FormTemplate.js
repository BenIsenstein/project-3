import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import UserContext from '../UserContext'
import { Page, PageContainer, BackIcon, PencilIcon, Form, Button, Label, Input, Textarea, StyledDateTimePicker, FlexSection } from '../common'
import ComplexInput from '../components/ComplexInput/ComplexInput'

/* 
NOTES
- the 'name' attribute of each input must match the attribute as it appears in the Mongoose model.
- the inputs array is very, very important. it needs this structure:

const inputs = [
  {
    name: "",
    registerOptions: {},
    props: {
      inputName: "",
      labelText: ""
    }
  }
]

- The BeforeForm and AfterForm props must be React components
- onSubmit is required as a prop to do anything useful.
- mode can be either 'details' or 'add'
- DETAILS MODE:
  * detailsUrl is crucial to fetch the details dynamically.



*/

const FormTemplate = ({ 
    mode, 
    BeforeForm,
    AfterForm,
    onSubmit, 
    inputs, 
    ...props }) => {
    // - - - - - - - - Hooks common to both modes - - - - - - - 
    const history = useHistory()
    const { register, formState: { errors }, handleSubmit, setValue, setFocus, reset, watch} = useForm({})

    // - - - - - - - - Details mode hooks - - - - - - - - - - -
    const { id } = useParams() 
    const [refresh, setRefresh] = useState(null)

    // viewMode can be 'details' or 'edit'
    const [viewMode, setViewMode] = useState('details')
    const shouldReadOnly = viewMode !== 'edit'

    // original values of the entry, for resetting, will be stored upon fetching
    const [resetValues, setResetValues] = useState({})
    const resetForm = () => reset(resetValues) 

    const [hasBeenChanged, setHasBeenChanged] = useState(false)

    // - - - - - - - - Add mode hooks - - - - - - - - - - - - -
    const userContext = useContext(UserContext)
    const user_id = userContext.user?._id || 'default'

    // - - - - Other effects/logic to prepare the form - - - - -

    // Register all inputs that were fed as props
    for (let { name, registerOptions } of inputs) register(name, registerOptions)

    // Ensure something logical executes on submit event
    onSubmit = async data => onSubmit ? await onSubmit(data) : alert('No onSubmit given to <FormTemplate />')
    
    // Effect to conditionally bring in entry and populate fields
    useEffect(() => {
      if (mode !== 'details') return
        
      const getEntry = async () => {
        try {
          // fetch details
          let detailsRes = await fetch(props.detailsUrl)
          let details = await detailsRes.json()
          let valuesForReset = {}

          // ensure that details.date is a Date object
          if (details.date) details.date = new Date(details.date)
           
          // set all inputs to blank
          for (let { name } of inputs) setValue(name, name === 'date' ? undefined : '...')

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
    }, [mode, props.detailsUrl, inputs, setRefresh, setValue, id])

    // Effect to conditionally control the value of 'hasBeenChanged'
    
    return <>
      {BeforeForm && <BeforeForm />} 
      <Form onSubmit={handleSubmit(async data => await onSubmit(data))}>   
        {inputs.map(({ props }) => <ComplexInput errors={errors} {...props} />)}
      </Form>  
      {AfterForm && <AfterForm />} 
    </>
}


export default FormTemplate