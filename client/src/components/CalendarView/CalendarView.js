import React, { useEffect, useState, useMemo, useContext } from 'react'
import UserContext from '../../UserContext'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // plugin for VIEW
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import listPlugin from "@fullcalendar/list" // needed for LIST view

const CalendarView = (props) => {
      
    // Capture the current state of the logged in user
    let userContext = useContext(UserContext)
  
    // Date is optional, current date will be set by default
    const currentDate = new Date()
    
    let taskList = [{}]
    
    // build taskList with selected fields from main Dates array
    let dateIndexer = 0

    console.log("data object = ", props.dates)
    // while (dateIndexer < props.data.length) {
    //   taskList[dateIndexer] = {
    //     title: props.dates.task,
    //     date: props.dates.date
    //   }
    //   dateIndexer += 1
    // }


    const handleEventClick = (arg) => {
      // history.push(`/task/${props._id}`)
      // alert(arg.dateStr)
      console.log("event = ", arg.event.title)
      alert(arg.event.title)
    }

    return (
        <div>
            <h1> FullCalendar </h1>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}
                initialView="dayGridMonth"
                // initialView="dayGridDay"
                weekends={true}
                events={[
                    { title: 'event 1', date: '2021-07-01' },
                    { title: 'event 2', date: '2021-07-04' }
                ]}
                eventClick={handleEventClick}
            />
        </div>
    )
}
export default CalendarView