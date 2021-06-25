import React, { useState } from 'react'

import CalendarListView from '../components/CalendarListView/CalendarListView'
import { ListIcon, CalendarIcon, AddIcon, SwitchViewButton, Button, Page, PageContainer } from '../common'
import './Calendar.css'

import AddEntryModal from '../components/modals/AddEntryModal'
import useAddEntryModal from '../components/modals/useAddEntryModal'

const Calendar = () => {
    const [viewMode, setViewMode] = useState('ListView')
    const {isShowing, toggle} = useAddEntryModal()
    
    //define state for refreshing the list view
    const [refresh, setRefresh] = useState()
    const reRenderList = () => setRefresh({})

    return (
        <Page>
            <PageContainer>
                <div className='calendar-top-options'>
                    <div className='calendar-add-task'>
                        <Button onClick={toggle}><AddIcon />New Task</Button>
                        <AddEntryModal
                            isShowing={isShowing}
                            hide={toggle}
                            reRenderList={reRenderList}
                        />                    
                    </div>

                    <button onClick={() => setViewMode(viewMode)}> 
                        Test refresh
                    </button>

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
                <div className='calendar-view-content'>
                    {viewMode === 'ListView' && <CalendarListView reRenderList={reRenderList} />}
                </div>
            </PageContainer>
        </Page>
    )
}

export default Calendar