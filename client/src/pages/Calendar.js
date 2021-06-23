import React, { useState } from 'react'

import CalendarListView from '../components/CalendarListView/CalendarListView'
import { ListIcon, CalendarIcon, SwitchViewButton, Button } from '../common'
import './Calendar.css'

const Calendar = () => {
    const [calendarView, setCalendarView] = useState('ListView')

    return (
        <div className='calendar-pg'>
            <div className='calendar-pg-container'>
                <div className='calendar-view-ctrl'>
                    <Button>New Task</Button>

                    <SwitchViewButton 
                        activeView={calendarView === 'ListView' ? true : false } 
                        onClick={() => setCalendarView('ListView')}
                    >
                        <ListIcon />
                    </SwitchViewButton>
                    <SwitchViewButton 
                        activeView={calendarView === 'CalendarView' ? true : false } 
                        onClick={() => setCalendarView('CalendarView')}
                    >
                        <CalendarIcon />
                    </SwitchViewButton>
                </div>
                <div className='calendar-view-content'>
                    {calendarView === 'ListView' && <CalendarListView />}
                </div>
            </div>
        </div>
    )
}

export default Calendar