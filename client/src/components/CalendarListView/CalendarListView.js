import React, { useEffect, useState }  from 'react'

import './CalendarListView.css'

const CalendarListView = () => {
    useEffect(() => {
        const fetchCalendarEntries = async () => {
            let entriesResponse = await fetch('./api/calendar/entries/:id')
            let resObject = await entriesResponse.json()

            // do something with object
        }

    }, [])

    return <div>List view</div>
}




export default CalendarListView