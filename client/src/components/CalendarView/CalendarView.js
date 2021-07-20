import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import UserContext from '../../UserContext'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // plugin for VIEW
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import listPlugin from "@fullcalendar/list" // needed for LIST view

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
  
  // Capture the current state of the logged in user
  let userContext = useContext(UserContext)
  
  // State Variables
  const [eventList, setEventList] = useState([{}])
    
    useEffect(() => {
      // Re-build the list of events. Events are currently grouped
      // together by common DATE, and each date in the array contains
      // another array of 'entries' associated with that date. In our
      // new array of tasks (taskList), each task will have its own
      // DATE attribute amongst other attributes we specifically want
      // to capture.
      let tempTaskList = [{}]
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
            date: dateStringAtOuterIndex,
            house: props.dates[datesOuterIndexer].entries[entriesInnerIndexer].house,
            title: props.dates[datesOuterIndexer].entries[entriesInnerIndexer].task,
            _id: props.dates[datesOuterIndexer].entries[entriesInnerIndexer]._id
          }
          taskListIndexer += 1
          entriesInnerIndexer += 1
        }
        datesOuterIndexer += 1
      }
      setEventList(tempTaskList) // Capture the temporary task list and set the STATE
    }, [props.dates])

    const handleEventClick = (arg) => {
      // history.push(`/task/${props._id}`)
      // alert(arg.dateStr)
      console.log("event = ", arg.event.title)
      alert(arg.event.title)
    }

    return (
        <StyleWrapper>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}
                initialView="dayGridMonth"
                // initialView="dayGridDay"
                weekends={true}
                eventClick={handleEventClick}
                // events={eventList}
                eventSources= {[
                  // OVERDUE Tasks
                  // {
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
                  //   color: 'red',     // an option!
                  //   textColor: 'white' // an option!
                  // },

                  // COMPLETED Tasks
                  // {
                  //   events: [ 
                  //     {
                  //       title  : 'event7',
                  //       start  : '2021-07-01'
                  //     },
                  //     {
                  //       title  : 'event8',
                  //       start  : '2021-07-02',
                  //       end    : '2021-07-03'
                  //     },
                  //     {
                  //       title  : 'event9',
                  //       start  : '2021-07-04T12:30:00',
                  //     }
                  //   ],
                  //   color: '#d1d1cf',     // grey
                  //   textColor: 'black' // an option!
                  // },

                  // ACTIVE UPCOMING Tasks
                  {
                    events: eventList,
                    color: '#03b1fc',     // blue
                    textColor: 'white' 
                  }
                ]}
                headerToolbar={{
                  left: 'title',
                  right: 'today prevYear,prev,next,nextYear'
                }}
                height='auto'
            />
        </StyleWrapper>
    )
}
export default CalendarView