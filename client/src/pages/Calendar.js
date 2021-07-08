import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import CalendarListView from '../components/CalendarListView/CalendarListView'
import { ListIcon, CalendarIcon, AddIcon, TrashIcon, SwitchViewButton, Button, Page, PageContainer } from '../common'
import './Calendar.css'

import AddEntryModal from '../components/modals/AddEntryModal'
import useAddEntryModal from '../components/modals/useAddEntryModal'
import TaskEntry from '../components/TaskEntry'

import UserContext from '../UserContext'

const Calendar = () => {
    const [viewMode, setViewMode] = useState('ListView')
    const {isShowing, toggle} = useAddEntryModal()
    const userContext = useContext(UserContext)
    
    //define state for refreshing the list view
    const [refresh, setRefresh] = useState()
    const reRenderList = () => setRefresh({})

    let history = useHistory()

    return (
        <Page>
            <PageContainer>
                <div className='calendar-top-options'>
                    <div className='calendar-add-task'>
                        {/* <Button onClick={toggle}><AddIcon />New Task</Button>
                        <AddEntryModal
                            isShowing={isShowing}
                            hide={toggle}
                            reRenderList={reRenderList}
                        />                     */}
                        {/* <Button onClick={()=>TaskEntry(reRenderList)}><AddIcon />New Task</Button> */}
                        <Button onClick={() => history.push(`/taskentry`)}><AddIcon />New Task</Button>
                    </div>
                    <div className='calendar-logout'>
                    <Button onClick={() => userContext.logOut()}><TrashIcon />Log Out</Button>
                    </div>
                    <div className='calendar-view-ctrl'>  
                        <SwitchViewButton 
                            activeView={viewMode === 'ListView'} 
                            onClick={() => setViewMode('ListView')}
                        >
                            <ListIcon />
                        </SwitchViewButton>
                        <SwitchViewButton 
                            activeView={viewMode === 'CalendarView'} 
                            onClick={() => setViewMode('CalendarView')}
                        >
                            <CalendarIcon />
                        </SwitchViewButton>
                    </div>                    
                </div>
                <div>
                    Displaying calendar for {userContext.userName}
                </div>
                <div className='calendar-view-content'>
                    {viewMode === 'ListView' && <CalendarListView reRenderList={reRenderList} />}
                </div>
            </PageContainer>
        </Page>
    )
}

export default Calendar