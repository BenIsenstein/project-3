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

  .fc-icon-chevron-right, .fc-icon-chevron-left, .fc-icon-chevrons-right, .fc-icon-chevrons-left {
    color: white;
    margin: -.15em 0 .05em 0;
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