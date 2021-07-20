import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import UserContext from '../../UserContext'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // plugin for VIEW
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import listPlugin from "@fullcalendar/list" // needed for LIST view
import timeGridPlugin from "@fullcalendar/timegrid" // needed for LIST view

const StyleWrapper = styled.div`
  .fc-toolbar {
    flex-direction: column;

    @media (min-width: ${props => props.theme.smScreen}) {
      flex-direction: row;
    }
  }

  .fc-toolbar-title {
    margin-bottom: .6em;
    font-size: 1.2em;
    color: ${props => props.theme.prm};

    @media (min-width: ${props => props.theme.smScreen}) {
      margin: 0;
    }
  }

  .fc-scroller.fc-scroller-liquid-absolute {
    overflow: none;
  }

  .fc-col-header-cell-cushion {
    font-size: .8em;
    font-weight: normal;
    color: ${props => props.theme.prm};
  }

  .fc-daygrid-day-number {
    font-size: .6em;
    color: ${props => props.theme.prm};
  }

  .fc-event-title {
    font-size: .8em;
  }

  .fc-button.fc-button-primary {
    font-family: inherit;
    font-size: .8em;
    font-weight: normal;
    text-transform: uppercase;
    color: white;
    border: none;
    border-radius: 6px;
    background-color: ${props => props.theme.scd};
    background-image: none;
    outline: none;

    &:hover {
      background-color: ${props => props.theme.scdDk};
      background-image: none;
    }

    &:active {
      background-color: ${props => props.theme.scdDk};
      box-shadow: none;
    }

    &:focus {
      background-color: ${props => props.theme.scdDk};
      box-shadow: none;
    }
  }
`

const CalendarView = (props) => {
  
  let calendarComponentRef = React.createRef()

  // Capture the current state of the logged in user
  let userContext = useContext(UserContext)

  // Use HISTORY
  const history = useHistory()
  
  // State Variables
  const [eventList, setEventList] = useState([{}])
  const [overdueList, setOverdueList] = useState([{}])
  const [completedList, setCompletedList] = useState([{}])
  const [upcomingList, setUpcomingList] = useState([{}])
  const [currentView, setCurrentView] = useState("dayGridMonth")

  // Capture the current date to be used as point of reference
  let dateToday = new Date()
  let dateTodayFormatted = dateToday.toISOString().substring(0, 10)
    
    useEffect(() => {
      // Re-build the list of events. Events are currently grouped
      // together by common DATE, and each date in the array contains
      // another array of 'entries' associated with that date. In our
      // new array of tasks (taskList), each task will have its own
      // DATE attribute amongst other attributes we specifically want
      // to capture.
      let tempTaskList = []
      let tempOverdueList = []
      let tempCompletedList = []
      let tempUpcomingList = []
      let datesOuterIndexer = 0
      let entriesInnerIndexer = 0
      let dateAtOuterIndex = ""
      let dateStringAtOuterIndex = "" 
      let taskListIndexer = 0
      while (datesOuterIndexer < props.dates.length) { // Outer array
        // convert date into calendar-friendly format
        dateAtOuterIndex = new Date(props.dates[datesOuterIndexer].date)
        dateStringAtOuterIndex = new Date(dateAtOuterIndex.getTime() - (dateAtOuterIndex.getTimezoneOffset() * 60000 ))
                            .toISOString()
                            .split("T")[0];

        entriesInnerIndexer = 0
        while(entriesInnerIndexer < props.dates[datesOuterIndexer].entries.length) {  // Inner array
          // console.log("Current inner props data = ", props.dates[datesOuterIndexer].entries[entriesInnerIndexer])
          tempTaskList[taskListIndexer] = {
            date: dateStringAtOuterIndex,  // Replaced by Start-End labels below
            start: dateStringAtOuterIndex,
            end: dateStringAtOuterIndex,
            house: props.dates[datesOuterIndexer].entries[entriesInnerIndexer].house,
            title: props.dates[datesOuterIndexer].entries[entriesInnerIndexer].task,
            completed: props.dates[datesOuterIndexer].entries[entriesInnerIndexer].completed,
            _id: props.dates[datesOuterIndexer].entries[entriesInnerIndexer]._id
          }
          //Conditionally build the Overdue, Completed, and Upcoming lists
          if (tempTaskList[taskListIndexer].completed) { //Add to Completed list
            tempCompletedList.push(tempTaskList[taskListIndexer])
          }
          else {
            if (tempTaskList[taskListIndexer].start < dateTodayFormatted) { //Add to Overdue list
              tempOverdueList.push(tempTaskList[taskListIndexer])
            }
            else { //Add to Upcoming list
              tempUpcomingList.push(tempTaskList[taskListIndexer])
            }
          }

          taskListIndexer += 1
          entriesInnerIndexer += 1
        }
        datesOuterIndexer += 1
      }

      // Set the respective STATE variables
      setEventList(tempTaskList)
      setOverdueList(tempOverdueList)
      setCompletedList(tempCompletedList)
      setUpcomingList(tempUpcomingList)

    }, [props.dates])

    const handleEventClick = (arg) => {
      history.push(`/task/${arg.event._def.extendedProps._id}`)
      console.log("arg.event", arg.event)
    }

    const handleDateClick = (arg) => {
      console.log("arg", arg)
      console.log("arg.date", arg.date)
      // alert(arg.date)
      // changeView('dayGridDay', arg.date)
      // calendar.changeView('timeGridDay')
      // changeView('timeGridDay', arg.date)

      // let calendarRef = React.createRef()
      // calendarRef.current
      //   .getApi()
      //   .changeView('timeGridDay', arg.date)

      let calendarApi = calendarComponentRef.current.getApi()
      calendarApi.changeView("timeGridDay", arg.date)
      
    // let calendarApi = this.calendarComponentRef.current.getApi();
    // calendarApi.changeView("timeGridDay");
    }

    return (
        <StyleWrapper>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin ]}
                ref = {calendarComponentRef}
                initialView="listMonth"  // LIST view
                // initialView="dayGridMonth"  // MONTH view
                // initialView="dayGridDay"  // DAY view
                // initialView="timeGridDay"  // DAY view with TIMES
                weekends={true}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
                // events={eventList} // Replaced by eventSources below
                eventSources= {[
                  // OVERDUE Tasks
                  {
                    events: overdueList,
                  //   //Consider possible FORMATS for events below
                  //   events: [ // put the array in the `events` property
                  //     {
                  //       title  : 'event1',
                  //       start  : '2021-07-01'
                  //     },
                  //     {
                  //       title  : 'event2',
                  //       start  : '2021-07-05',
                  //       end    : '2021-07-07'
                  //     },
                  //     {
                  //       title  : 'event3',
                  //       start  : '2021-07-09T12:30:00',
                  //     }
                  //   ],
                    color: 'red',     
                    textColor: 'white' 
                  },

                  // COMPLETED Tasks
                  {
                    events: completedList,
                    color: '#d1d1cf',     // grey
                    textColor: 'black' 
                  },

                  // ACTIVE UPCOMING Tasks
                  {
                    // events: eventList,
                    events: upcomingList,
                    color: '#03b1fc',     // blue
                    textColor: 'white' 
                  }
                ]}
                headerToolbar={{
                  left: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                  center: 'title',
                  right: 'today prevYear,prev,next,nextYear'
                }}
                height='auto'
            />
        </StyleWrapper>
    )
}
export default CalendarView