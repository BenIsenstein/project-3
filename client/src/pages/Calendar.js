import React, { useState } from 'react'

import CalendarListView from '../components/CalendarListView/CalendarListView'
import InputCalendarEntry from '../components/InputCalendarEntry/InputCalendarEntry'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as ListIcon } from '../assets/list.svg'
import { ReactComponent as CalendarIcon } from '../assets/calendar.svg'
import './Calendar.css'

const Calendar = () => {
    const [calendarView, setCalendarView] = useState('ListView')
    const [newCalendarEntry, setNewCalendarEntry] = useState('Invisible')

    return (
        <div className='calendar-pg'>
            <div className='calendar-pg-container'>
                <div className='calendar-view-ctrl'>
                    {/* <button onClick={() => setNewCalendarEntry('Visible')}><PlusIcon />Add A New Task</button> */}
                    <button onClick={() => setCalendarView('ListView')}><ListIcon />List View</button>
                    <button onClick={() => setCalendarView('CalendarView')}><CalendarIcon />Calendar View</button>
                </div>
                <div className='calendar-view-content'>
                    {calendarView === 'ListView' && <CalendarListView />}
                    {newCalendarEntry === 'Visible' && <InputCalendarEntry />}
                </div>
            </div>
        </div>
    )
}

export default Calendar