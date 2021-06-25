import React, { useState } from 'react'

import CalendarListView from '../components/CalendarListView/CalendarListView'
import { ListIcon, CalendarIcon, AddIcon, SwitchViewButton, Button, Page, PageContainer } from '../common'
import './Calendar.css'

import AddEntryModal from '../components/modals/AddEntryModal'
import useAddEntryModal from '../components/modals/useAddEntryModal'

const Calendar = () => {
    const [viewMode, setViewMode] = useState('ListView')
    const {isShowing, toggle} = useAddEntryModal()

    return (
        <Page>
            <PageContainer>
                <div className='calendar-view-ctrl'>
                    <Button onClick={toggle}><AddIcon />New Task</Button>
                    <AddEntryModal
                        isShowing={isShowing}
                        hide={toggle}
                    />
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
                <div className='calendar-view-content'>
                    {viewMode === 'ListView' && <CalendarListView />}
                </div>
            </PageContainer>
        </Page>
    )
}

export default Calendar