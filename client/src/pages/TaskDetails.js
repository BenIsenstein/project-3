import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

import { Page, PageContainer, Button, BackIcon } from '../common'

const TaskDetails = () => {
    const [task, setTask] = useState(null)
    const { id } = useParams()
    let history = useHistory()

    useEffect(() => {
        const getTask = async () => {
            let taskResponse = await fetch(`/api/calendarEntry/get/${id}`)
            let resObject = await taskResponse.json()
            let tasksDetails = resObject.calendarEntry
            setTask(tasksDetails)
        }
        getTask()
    }, [])


      

    if (!task) return null

    
    return (
        <Page>
            <PageContainer>
                <Button onClick={() => history.push(`/`)}><BackIcon />Calendar</Button>
                <p> {task.item} </p>
                <p>{task.task}</p>
                <p>{new Date(task.date).toString()}</p>
                <p>{task.description}</p>
                <Link to={`/Calendar/${task}/update`}>Update</Link>
                <Button important type='submit' >Save Changes</Button> 
            </PageContainer>
        </Page>
    )
}

export default TaskDetails