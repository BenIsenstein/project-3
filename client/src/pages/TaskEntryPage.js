import React from 'react'
import { Page, PageContainer } from '../common'
import TaskEntry from "../components/TaskEntry"

const TaskEntryPage = () => {

    return (
        <Page>
            <PageContainer>
                <h2>Add New Calendar Entry</h2>
                <TaskEntry />
            </PageContainer>
        </Page>
    )
}
export default TaskEntryPage