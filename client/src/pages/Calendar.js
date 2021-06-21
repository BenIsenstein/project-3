import React, { useState } from 'react'

import CalendarListView from '../components/CalendarListView/CalendarListView'
import './Calendar.css'

const Calendar = () => {
    const [calendarView, setCalendarView] = useState('ListView')

    return (
        <div className='calendar-pg'>
            <div className='calendar-pg-container'>
                <div className='calendar-view-ctrl'>
                    <button onClick={() => setCalendarView('ListView')}>List View</button>
                    <button onClick={() => setCalendarView('CalendarView')}>Calendar View</button>
                </div>
                <div className='calendar-view-content'>
                    {calendarView === 'ListView' && <CalendarListView />}
                </div>
            </div>
        </div>
    )
}

export default Calendar