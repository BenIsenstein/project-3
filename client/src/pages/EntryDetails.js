import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Page, PageContainer, Button, BackIcon, Form, Label, Input, Textarea, PencilIcon, StyledDateTimePicker } from '../common'
import { useForm } from 'react-hook-form'
import DeleteEntryButton from '../components/DeleteEntryButton'

const EntryDetails = () => {
    const { register, formState: { errors }, handleSubmit, setValue, setFocus } = useForm({})
    const [refresh, setRefresh] = useState(null)
    const { id } = useParams()
    let history = useHistory()
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

        for (let pair of inputs) decideActive(pair.isActive, pair.name)
    }, [
        inputs,
        setFocus,
        taskActive,
        itemActive,
        descriptionActive
    ])

    // update 'date' input field whenever the piece of state is changed
    useEffect(() => setValue('date', date), [setValue, date])

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
                setDate(new Date(date))
                setValue('description', description)

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

    const ActivePencil = props => <PencilIcon 
        onClick={() => {
            props.setter(!props.isActive)

            for (let pair of inputs.filter(pair => pair.isActive !== props.isActive)) pair.setter(false)
        }} 
    />

    if (!refresh) return null
    
    return (
        <Page>
            <PageContainer>
                <Form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
                    <Button onClick={() => history.push(`/calendar`)}><BackIcon />Calendar</Button>
                    <Label htmlFor="item">Item</Label>
                    <ActivePencil isActive={itemActive} setter={setItemActive}/>
                    <Input
                        detailedPage
                        disabled={!itemActive}
                        id="item" 
                        {...register("item", {required: "You must indicate an item."})}
                        name="item"
                    />
                    {errors.item && <p className="">{errors.item.message}</p>}
                    
                    <Label htmlFor="task">Task</Label>
                    <ActivePencil isActive={taskActive} setter={setTaskActive}/>
                    <Input 
                        detailedPage
                        disabled={!taskActive}
                        id="task" 
                        {...register("task", {required: "You must indicate a task."})} 
                        name="task"
                    />
                    {errors.task && <p className="">{errors.task.message}</p>}

                    <Label htmlFor="description">Description</Label>
                    <ActivePencil isActive={descriptionActive} setter={setDescriptionActive}/>
                    <Textarea 
                        detailedPage
                        disabled={!descriptionActive}
                        id="description" 
                        {...register("description", {required: "You must write a description."})} 
                        name="description"
                    />
                    {errors.description && <p className="">{errors.description.message}</p>}

                    <Label htmlFor="date">Date</Label>
                    <ActivePencil isActive={dateActive} setter={setDateActive}/>
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
            
                    <Button formSubmit important type='submit' >Save Changes</Button>
                </Form>
                <DeleteEntryButton entryId={id} />
            </PageContainer>
        </Page>
    )
}

export default EntryDetails