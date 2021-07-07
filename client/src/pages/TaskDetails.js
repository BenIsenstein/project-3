import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Page, PageContainer, Button, BackIcon, Form } from '../common'
import { useForm } from 'react-hook-form'
import DateTimePicker from 'react-datetime-picker'

const TaskDetails = () => {
    const { register, formState: { errors }, handleSubmit, setValue } = useForm({})
    const [refresh, setRefresh] = useState(null)
    const { id } = useParams()
    let history = useHistory()
    const [date, setDate] = useState()

    // update 'date' input field whenever the piece of state is changed
    useEffect(() => setValue('date', date), [setValue, date])

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

    if (!refresh) return null

    
    return (
        <Page>
            <PageContainer>
                <Form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
                    <Button onClick={() => history.goBack()}><BackIcon />Calendar</Button>
                    <label htmlFor="item">Item</label>
                    <input id="item" {...register("item", {required: "You must choose an item."})} name="item"/>
                    {errors.item && <p className="">{errors.item.message}</p>}

                    <label htmlFor="task">Task</label>
                    <input id="task" {...register("task", {required: "You must choose a task."})} name="task"/>
                    {errors.task && <p className="">{errors.task.message}</p>}

                    <label htmlFor="description">Description</label>
                    <input id="description" {...register("description", {required: "You must write a description."})} name="description"/>
                    {errors.description && <p className="">{errors.description.message}</p>}

                    <label htmlFor="date">Date</label>
                    <DateTimePicker
                      id="date"
                      onChange={setDate}
                      value={date}
                    />
                    <input type='hidden' name='date' {...register('date', {required: "You must choose a date."})} />
                    {errors.date && <p className="">{errors.date.message}</p>}
          
                    <Button important type='submit' >Save Changes</Button>
                </Form>
            </PageContainer>
        </Page>
    )
}

export default TaskDetails