import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Page, PageContainer, Button, BackIcon } from '../common'

const TaskDetails = () => {
    const [task, setTask] = useState(null)

    const { id } = useParams()
    let history = useHistory()

    useEffect(() => {
        const getTask = async () => {
            let taskResponse = await fetch(`/api/calendarEntry/get/${id}`)
            let resObject = await taskResponse.json()
            let taskDetails = resObject.calendarEntry
            setTask(taskDetails)
        }
        getTask()
    }, [])

    if (!task) return null
    
    return (
        <Page>
            <PageContainer>
                <Button onClick={() => history.push(`/`)}><BackIcon />Calendar</Button>
                <p>{task.item}</p>
                <p>{task.task}</p>
                <p>{task.date}</p>
                <p>{task.description}</p>
                <Button important>Save Changes</Button>
            </PageContainer>
        </Page>
    )
}

export default TaskDetails