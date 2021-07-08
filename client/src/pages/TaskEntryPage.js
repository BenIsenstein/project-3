import React from 'react'
import { Page, PageContainer } from '../common'
import TaskEntry from "../components/TaskEntry"

const TaskEntryPage = () => {

    return (
        <Page>
            <PageContainer>
                <TaskEntry />
            </PageContainer>
        </Page>
    )
}
export default TaskEntryPage