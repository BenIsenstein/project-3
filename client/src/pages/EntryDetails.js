import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Page, PageContainer, Button, BackIcon, Form, Label, Input, Textarea, PencilIcon, StyledDateTimePicker, FlexSection } from '../common'
import { useForm } from 'react-hook-form'
import DeleteEntryButton from '../components/DeleteEntryButton'

const EntryDetails = () => {
    const { register, formState: { errors }, handleSubmit, setValue, setFocus } = useForm({})
    const { id } = useParams()
    const history = useHistory()
    const [refresh, setRefresh] = useState(null)
    const [date, setDate] = useState()
    const [itemActive, setItemActive] = useState(false)
    const [taskActive, setTaskActive] = useState(false)
    const [descriptionActive, setDescriptionActive] = useState(false)
    const [dateActive, setDateActive] = useState(false)

    // array of all inputs in the form
    const inputs = useMemo(() => [
        {isActive: taskActive, setter: setTaskActive, name: 'task'},
        {isActive: itemActive, setter: setItemActive, name: 'item'},
        {isActive: descriptionActive, setter: setDescriptionActive, name: 'description'},
        {isActive: dateActive, setter: setDateActive, name: 'date'}
    ], [
        taskActive,
        itemActive,
        descriptionActive,
        dateActive
    ])

    // effect to focus the right input when the 'active' state changes by clicking on the pencil icon
    useEffect(() => { 
        const decideActive = (isActive, name) => {if (isActive) setFocus(name)}
        
        for (let input of inputs) decideActive(input.isActive, input.name)
    }, [
        inputs,
        setFocus,
        taskActive,
        itemActive,
        descriptionActive
    ])

    // get the entry from mongoDB
    useEffect(() => {
        const getEntry = async () => {
            try {
                setValue('item', '...')
                setValue('task', '...')
                setDate(undefined)
                setValue('description', '...')
            
                let entryResponse = await fetch(`/api/calendarEntry/get/${id}`)
                let resObject = await entryResponse.json()
                let entryDetails = resObject.calendarEntry
                let {
                    item,
                    task,
                    date,
                    description 
                } = entryDetails
            
                setValue('item', item)
                setValue('task', task)
                setValue('description', description)
                setDate(new Date(date))

                setRefresh({})
            }
            catch(err) {
                console.log(err)
                alert("There as an error loading your entry. We're working on it as fast as we can.")
            }   
        }
        getEntry()
    }, [setRefresh, setValue, id])

    // form submit function
    const onSubmit = async (data) => {
        console.log('data: ', data)

        let action = `/api/calendarEntry/update/${id}`
        let options = {
          method: "put",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data)
        }
    
        try {
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

    //edit icon that makes the desired input field active
    const ActivePencil = props => <PencilIcon 
        onClick={() => {
            props.setter(!props.isActive)
            for (let input of inputs.filter(input => input.isActive !== props.isActive)) input.setter(false)
        }} 
    />

    // update 'date' input field whenever the piece of state is changed
    useEffect(() => setValue('date', date), [setValue, date])

    if (!refresh) return null
    
    return (
        <Page>
            <PageContainer>
                <Form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
                    <Button onClick={() => history.push(`/calendar`)}><BackIcon />Calendar</Button>
                    <FlexSection>
                        <Label htmlFor="item">Item</Label>        
                    </FlexSection>
                    <FlexSection fullWidth>
                        <Input
                            detailedPage
                            maxLength='50'
                            id="item" 
                            {...register("item", {required: "You must indicate an item."})}
                            name="item"
                        />
                    {errors.item && <p className="">{errors.item.message}</p>}                        
                    </FlexSection>                  
                    <FlexSection>
                        <Label htmlFor="task">Task</Label>                             
                    </FlexSection>
                    <FlexSection fullWidth>
                        <Input 
                            detailedPage
                            maxLength='50'
                           
                            id="task" 
                            {...register("task", {required: "You must indicate a task."})} 
                            name="task"
                        />
                        {errors.task && <p className="">{errors.task.message}</p>}                        
                    </FlexSection>
                    <FlexSection>
                        <Label htmlFor="description">Description</Label>                       
                    </FlexSection>
                    <FlexSection fullWidth>
                        <Textarea 
                            detailedPage
                            id="description" 
                            {...register("description", {required: "You must write a description."})} 
                            name="description"
                        />
                        {errors.description && <p className="">{errors.description.message}</p>}                        
                    </FlexSection>
                    <FlexSection>
                        <Label htmlFor="date">Date</Label>
                        <ActivePencil isActive={dateActive} setter={setDateActive}/>                      
                    </FlexSection>
                    <FlexSection fullWidth>
                        {dateActive
                            ? <StyledDateTimePicker
                            id="date"
                            onChange={setDate}
                            value={date}
                            />
                            : date?.toString()
                        }
                        <Input type='hidden' name='date'  {...register('date', {required: "You must choose a date."})} />
                        {errors.date && <p className="">{errors.date.message}</p>}                        
                    </FlexSection>
                    <Button formSubmit important type='submit'>Save Changes</Button>                        
                </Form>

                <FlexSection justifyCenter>
                    <DeleteEntryButton formSubmit={true} entryId={id} />                   
                </FlexSection>

            </PageContainer>
        </Page>
    )
}

export default EntryDetails