import React, { useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Page, PageContainer, Button, BackIcon, Form, Label, Input, Textarea, PencilIcon, StyledDateTimePicker } from '../common'
import { useForm } from 'react-hook-form'

const EntryDetails = () => {
    //declaring test input
    function TextInputWithFocusButton() {
        const inputEl = useRef(null);
        const onButtonClick = () => {
          // `current` points to the mounted text input element
          inputEl.current.focus();
        };
        return (
          <>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
          </>
        );
    }
    const { register, formState: { errors }, handleSubmit, setValue } = useForm({})
    const [refresh, setRefresh] = useState(null)
    const { id } = useParams()
    let history = useHistory()
    const [date, setDate] = useState()
    const [itemActive, setItemActive] = useState(false)
    const itemRef = useRef(null)
    const [taskActive, setTaskActive] = useState(false)
    const taskRef = useRef(null)
    const [descriptionActive, setDescriptionActive] = useState(false)
    const descriptionRef = useRef(null)
    const [dateActive, setDateActive] = useState(false)

    //const setRef = (element, ref) => ref.current = element

    // effect to focus the right input when the 'active' state changes by clicking on the pencil icon
    useEffect(() => {
        //for (let ref of [taskRef, itemRef, descriptionRef]) if (!ref.current) return
        
        const decideActive = (isActive, ref) => {if (isActive) ref.current.focus()}

        decideActive(taskActive, taskRef)
        decideActive(itemActive, itemRef)
        decideActive(descriptionActive, descriptionRef)
    }, [
        taskActive,
        itemActive,
        descriptionActive
    ])

    // log the value of the refs when the 'active' state changes
    useEffect(() => {
        console.log("logging refs:")
        for (let ref of [taskRef, itemRef, descriptionRef]) console.log(ref)
    }, [
        itemActive, 
        taskActive, 
        descriptionActive
    ])

    // update 'date' input field whenever the piece of state is changed
    useEffect(() => setValue('date', date), [setValue, date])

    // get the entry from mongoDB
    useEffect(() => {
        const getEntry = async () => {
            try {
                console.log('getEntry() is running')
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

    const ActivePencil = props => <PencilIcon onClick={() => {props.setter(!props.state)}} />

    if (!refresh) return null

    const {ref: itemRegister, ...rest} = register("item", {required: "You must indicate an item."})

    return (
        <Page>
            <PageContainer>
                <TextInputWithFocusButton />
                <Form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
                    <Button onClick={() => history.push(`/calendar`)}><BackIcon />Calendar</Button>
                    <Label htmlFor="item">Item</Label>
                    <ActivePencil state={itemActive} setter={setItemActive}/>
                    <Input
                        detailedPage
                        ref={elem => {itemRegister(elem); itemRef.current = elem}}
                        disabled={!itemActive}
                        id="item" 
                        {...rest}
                        name="item"
                    />
                    {errors.item && <p className="">{errors.item.message}</p>}
                    
                    <Label htmlFor="task">Task</Label>
                    <ActivePencil state={taskActive} setter={setTaskActive}/>
                    <Input 
                        detailedPage
                        ref={taskRef}
                        disabled={!taskActive}
                        id="task" 
                        {...register("task", {required: "You must indicate a task."})} 
                        name="task"
                    />
                    {errors.task && <p className="">{errors.task.message}</p>}

                    <Label htmlFor="description">Description</Label>
                    <ActivePencil state={descriptionActive} setter={setDescriptionActive}/>
                    <Textarea 
                        detailedPage
                        ref={descriptionRef}
                        disabled={!descriptionActive}
                        id="description" 
                        {...register("description", {required: "You must write a description."})} 
                        name="description"
                    />
                    {errors.description && <p className="">{errors.description.message}</p>}

                    <Label htmlFor="date">Date</Label>
                    <ActivePencil state={dateActive} setter={setDateActive}/>
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
                    <Button formSubmit type='submit' >Delete Event</Button>
                </Form>
            </PageContainer>
        </Page>
    )
}

export default EntryDetails