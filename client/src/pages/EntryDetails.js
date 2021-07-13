import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Page, PageContainer, Button, BackIcon, Form, Label, Input, Textarea, PencilIcon, StyledDateTimePicker, FlexSection } from '../common'
import { useForm } from 'react-hook-form'
import DeleteEntryButton from '../components/DeleteEntryButton'

const EntryDetails = () => {
    const { register, formState: { errors }, handleSubmit, setValue, setFocus, reset, watch} = useForm({})
    const { id } = useParams()
    const history = useHistory()
    const [refresh, setRefresh] = useState(null)

    // viewMode can be 'details' or 'edit'
    const [viewMode, setViewMode] = useState('details')
    const shouldReadOnly = viewMode !== 'edit'

    // original values of the entry, for resetting, will be stored upon fetching
    const [resetValues, setResetValues] = useState({})
    const resetForm = () => {
        reset(resetValues) 
        setViewMode('details')
    }

    // watch the values of every input
    const watchedItem = watch('item')
    const watchedTask = watch('task')
    const watchedDescription = watch('description')
    const watchedDate = watch('date')
    const [hasBeenChanged, setHasBeenChanged] = useState(false)

    // 'active' inputs boolean values
    // const [itemActive, setItemActive] = useState(false)
    // const [taskActive, setTaskActive] = useState(false)
    // const [descriptionActive, setDescriptionActive] = useState(false)
    // const [dateActive, setDateActive] = useState(false)

    // array of all inputs in the form
    // const inputs = useMemo(() => [
    //     {isActive: taskActive, setter: setTaskActive, name: 'task'},
    //     {isActive: itemActive, setter: setItemActive, name: 'item'},
    //     {isActive: descriptionActive, setter: setDescriptionActive, name: 'description'},
    //     {isActive: dateActive, setter: setDateActive, name: 'date'}
    // ], [
    //     taskActive,
    //     itemActive,
    //     descriptionActive,
    //     dateActive
    // ])

    // effect to focus the right input when the 'active' state changes by clicking on the pencil icon
    // useEffect(() => { 
    //     const decideActive = (isActive, name) => {if (isActive) setFocus(name)}
        
    //     for (let input of inputs) decideActive(input.isActive, input.name)
    // }, [
    //     inputs,
    //     setFocus,
    //     taskActive,
    //     itemActive,
    //     descriptionActive
    // ])

    // edit icon that makes the desired input field active
    // const ActivePencil = props => <PencilIcon onClick={() => props.setter(!props.isActive)} />

    // get the entry from mongoDB
    useEffect(() => {
        const getEntry = async () => {
            try {
                setValue('item', '...')
                setValue('task', '...')
                setValue('date', undefined)
                setValue('description', '...')
            
                let entryResponse = await fetch(`/api/calendarEntry/get/${id}`)
                let entryDetails = await entryResponse.json()
                let {
                    item,
                    task,
                    date,
                    description 
                } = entryDetails

                date = new Date(date)

                // define some reset values incase the user wants to cancel changes, but keep viewing their details
                setResetValues({ item, task, description, date })
            
                setValue('item', item)
                setValue('task', task)
                setValue('description', description)
                setValue('date', date)

                setRefresh({})
            }
            catch(err) {
                console.log(err)
                alert("There as an error loading your entry. We're working on it as fast as we can.")
            }   
        }
        getEntry()
    }, [setRefresh, setValue, id])

    // control the value of 'hasBeenChanged', to render buttons conditionally
    useEffect(() => {
        const currentValues = {
            item: watchedItem, 
            task: watchedTask, 
            description: watchedDescription, 
            date: watchedDate
        }

        const doEntriesMatch = Object.keys(resetValues).every(key => 
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
    }, [
        watchedItem, 
        watchedTask, 
        watchedDescription, 
        watchedDate, 
        resetValues, 
    ])

    // form submit function
    const onSubmit = async (data) => {
        try {
          let action = `/api/calendarEntry/update/${id}`
          let options = {
            method: "put",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
          }
          let res = await fetch(action, options)
          let resObject = await res.json()
          
          if (!resObject.success) return alert("Your entry wasn't updated for some reason. Please try again.")

          history.goBack()
        }
        catch(err) {
          console.log('error updating calendar entry: ', err)
          alert("There was an error updating your entry. We're fixing it as fast as we can.")
        }
    } 

    // edit icon that makes the desired input field active
    // const ActivePencil = props => <PencilIcon onClick={() => props.setter(!props.isActive)} />

    // edit or details icon. Changes which icon it is based on view mode
    const EditOrDetailsButton = props => {
        if (shouldReadOnly) return <PencilIcon {...props} onClick={() => setViewMode('edit')} />
        // if (viewMode === 'edit') return <CheckIcon {...props} onClick={() => setViewMode('details')} />
        if (viewMode === 'edit') return null
    }

    if (!refresh) return null
    
    return (
        <Page>
            <PageContainer>
                {shouldReadOnly && <Button type='button' onClick={() => history.push('/calendar')}><BackIcon />Calendar</Button>}

                <FlexSection spaceBetween>
                    <p>Home Feature</p>
                    <EditOrDetailsButton />                    
                </FlexSection>

                <Form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>

                    <Label htmlFor="item">Item</Label>        
                    <Input
                        detailedPage
                        readOnly={shouldReadOnly}
                        maxLength='50'
                        id="item" 
                        {...register("item", {required: "You must indicate an item."})}
                        name="item"
                    />
                    {errors.item && <p>{errors.item.message}</p>}                        

                    <Label htmlFor="task">Task</Label>                             
                    <Input 
                        detailedPage
                        readOnly={shouldReadOnly}
                        maxLength='50'
                        id="task" 
                        {...register("task", {required: "You must indicate a task."})} 
                        name="task"
                    />
                    {errors.task && <p>{errors.task.message}</p>}                        

                    <Label htmlFor="description">Description</Label>                       
                    <Textarea 
                        detailedPage
                        readOnly={shouldReadOnly}
                        id="description" 
                        {...register("description", {required: "You must write a description."})} 
                        name="description"
                    />
                    {errors.description && <p>{errors.description.message}</p>}                        

                    <Label htmlFor="date">Date & Time</Label>            
                    {shouldReadOnly
                        ? <Input detailedPage readOnly as="div">{watchedDate?.toString()}</Input>
                        : <StyledDateTimePicker
                            id="date"
                            onChange={e => setValue('date', e)}
                            value={watchedDate}
                        />
                    }
                    <Input  name='date'  type='hidden' {...register('date', {required: "You must choose a date."})} />
                    {errors.date && <p>{errors.date.message}</p>}                        

                    {!shouldReadOnly 
                        && <FlexSection fullWidth marginTop1em>
                            <Button fullWidth important type='submit'>Save</Button>
                            <Button fullWidth onClick={() => resetForm()}>Cancel</Button>                              
                        </FlexSection>
                    }
                </Form>

                {shouldReadOnly 
                    && <FlexSection marginTop1em>
                        <DeleteEntryButton fullWidth entryId={id} /> 
                    </FlexSection>
                }
            </PageContainer>
        </Page>
    )
}

export default EntryDetails