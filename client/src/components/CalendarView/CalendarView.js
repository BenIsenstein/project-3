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

  .fc-icon-chevron-right, .fc-icon-chevron-left, .fc-icon-chevrons-right, .fc-icon-chevrons-left {
    color: white;
    margin: -.1em 0 0 0;
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

  .fc-button {
    font-family: inherit;
    font-size: .8em;
    font-weight: normal;
    text-transform: uppercase;
    color: white;
    border: none;
    border-radius: 6px;
    background-color: ${props => props.theme.prmLt};
    background-image: none;
    outline: none;

    &:disabled {
      opacity: .4;
      background-color: ${props => props.theme.prmLt};

      &:hover {
        background-color: ${props => props.theme.prmLt};
        cursor: not-allowed;
      }
    }

    &:focus {
      background-color: ${props => props.theme.prm};
      box-shadow: none;
    }
  }

  .fc-button-primary {
    &:hover {
      background-color: ${props => props.theme.prm};
    }

    &:not(:disabled):active {
        background-color: ${props => props.theme.prm};

        &:focus {
          box-shadow: none;
        }
      }

    &:focus {
      background-color: ${props => props.theme.prm};
    }
  }
`

const CalendarView = (props) => {
  
  let calendarComponentRef = React.createRef()

  // Use HISTORY
  const history = useHistory()
  
  // State Variables
  const [eventList, setEventList] = useState([{}])
  const [overdueList, setOverdueList] = useState([{}])
  const [completedList, setCompletedList] = useState([{}])
  const [upcomingList, setUpcomingList] = useState([{}])

  // Capture the current date to be used as point of reference
  let dateTodayFormatted = new Date().toISOString().substring(0, 10)
    
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
      let taskListIndexer = 0

      console.log('props.dates: ', props.dates)
      while (datesOuterIndexer < props.dates.length) { // Outer array
        // convert date into calendar-friendly format
        
        entriesInnerIndexer = 0
        while (entriesInnerIndexer < props.dates[datesOuterIndexer].entries.length) {  // Inner array
          // console.log("Current inner props data = ", props.dates[datesOuterIndexer].entries[entriesInnerIndexer])
          let currentEntry = props.dates[datesOuterIndexer].entries[entriesInnerIndexer]
          console.log(currentEntry)

          tempTaskList[taskListIndexer] = {
            start: currentEntry.start,
            end: currentEntry.end,
            house: currentEntry.house,
            title: currentEntry.task,
            completed: currentEntry.completed,
            _id: currentEntry._id
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
                businessHours={true}
                //businessHours= {
                 // daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday - Friday
                 // startTime:'07:00', // a start time (7am in this example)
                 // endTime: '18:00'  // an end time (6pm in this example)
                //} 
                slotDuration={'01:00:00'}
                scrollTime= {'06:00:00'}
                scrollTimeReset={true}
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