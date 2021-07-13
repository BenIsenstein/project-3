import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import UserContext from '../UserContext'
import { Page, PageContainer, BackIcon, PencilIcon, Form, Button, Label, Input, Textarea, StyledDateTimePicker, FlexSection } from '../common'
import ComplexInput from '../components/ComplexInput/ComplexInput'

/* 
NOTES
- The BeforeForm and AfterForm props must be React components. 


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
    for (let input of inputs) register(input.name, input.registerOptions)

    // Ensure something logical executes on submit event
    onSubmit = async data => onSubmit ? await onSubmit(data) : alert('No onSubmit given to <FormTemplate />')
    
    // Effect to conditionally bring in entry and populate fields

    // Effect to conditionally control the value of 'hasBeenChanged'

    
    
    return <>
      {BeforeForm && <BeforeForm />}
      <Form onSubmit={handleSubmit(async data => await onSubmit(data))}>   

      </Form>  
      {AfterForm && <AfterForm />} 
    </>
    
}


export default FormTemplate