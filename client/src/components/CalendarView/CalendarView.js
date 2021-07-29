import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // plugin for VIEW
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import listPlugin from "@fullcalendar/list" // needed for LIST view
import timeGridPlugin from "@fullcalendar/timegrid" // needed for LIST view

const StyleWrapper = styled.div`
  .fc-toolbar {
    margin-top: 1em;
    flex-direction: column;

    @media (min-width: ${props => props.theme.lgScreen}) {
      flex-direction: row;
    }
  }

  .fc-toolbar-title {
    margin: .6em 0;
    font-size: 1.2em;
    color: ${props => props.theme.titleColor};

    @media (min-width: ${props => props.theme.lgScreen}) {
      margin: 0;
    }
  }

  .fc-icon-chevron-right, .fc-icon-chevron-left, .fc-icon-chevrons-right, .fc-icon-chevrons-left {
    color: white;
    margin-top: -.15em;
    font-weight: 600;
  }

  .fc-scrollgrid-sync-inner {
    text-align: center;
  }

  .fc-col-header-cell-cushion {
    font-size: .8em;
    font-weight: normal;
    color: ${props => props.theme.contentColor};
    align-self: center;
  }

  .fc-scroller-harness {
    overflow: visible;
  }

  .fc-daygrid-day-number {
    font-size: .6em;
    color: ${props => props.theme.contentColor};
  }

  .fc-event-title {
    font-size: .8em;
    color: ${props => props.theme.contentColor};

    &:hover {
      overflow: visible;
      z-index: 5;
    }
  }

  .fc-button {
    font-family: inherit;
    font-size: .8em;
    font-weight: 500;
    text-transform: uppercase;
    color: white;
    border: none;
    border-radius: 6px;
    background-color: ${props => props.theme.scdLt};
    background-image: none;
    outline: none;

    &:disabled {
      opacity: .4;
      background-color: ${props => props.theme.scdLt};

      &:hover {
        background-color: ${props => props.theme.scdLt};
        cursor: not-allowed;
      }
    }

    &:focus {
      background-color: ${props => props.theme.scd};
      box-shadow: none;
    }
  }

  .fc-button-primary {
    &:hover {
      background-color: ${props => props.theme.scd};
    }

    &:not(:disabled):active {
        background-color: ${props => props.theme.scd};

        &:focus {
          box-shadow: none;
        }
      }

    &:focus {
      background-color: ${props => props.theme.scd};
    }

    &.fc-button-active {
      &:focus {
        box-shadow: none;
      }
    }
  }

  .fc-button-primary:not(:disabled).fc-button-active {
    background-color: ${props => props.theme.scd};

    &:focus {
      background-color: ${props => props.theme.scd};
      box-shadow: none;
    }
  }

  .fc-timegrid-axis-cushion {
    font-size: .8em;
    color: ${props => props.theme.contentColor};
  }

  .fc-timegrid-slot-label-cushion {
    font-size: .8em;
    color: ${props => props.theme.contentColor};
  }

  .fc-list-day-cushion {
    color: ${props => props.theme.titleColor};
    background: ${props => props.theme.prmLt};
  }

  .fc-list-table {
    color: ${props => props.theme.contentColor};
  }

  .fc-non-business {
    background: ${props => props.theme.prmLt};
    opacity: .6;
  }

  .fc-list-empty-cushion {
    color: ${props => props.theme.contentColor};
  }

  .fc-list-event-time {
    white-space: normal;
    width: auto;
  }

  .fc-event-time {
    font-size: .8em;
    color: ${props => props.theme.contentColor};
  }
`

const CalendarView = ({ dates, ...props }) => {
  
  let calendarComponentRef = React.createRef()

  // Use history
  const history = useHistory()
  
  // State Variables
  const [eventList, setEventList] = useState([{}])
  const [overdueList, setOverdueList] = useState([{}])
  const [completedList, setCompletedList] = useState([{}])
  const [upcomingList, setUpcomingList] = useState([{}])
    
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

      while (datesOuterIndexer < dates.length) { // Outer array
        entriesInnerIndexer = 0
        let entries = dates[datesOuterIndexer].entries

        while (entriesInnerIndexer < entries.length) {  // Inner array
          let currentEntry = entries[entriesInnerIndexer]
         
          tempTaskList[taskListIndexer] = {
            start: currentEntry.start,
            end: currentEntry.end,
            house: currentEntry.house,
            title: currentEntry.item + ' - ' + currentEntry.task,
            completed: currentEntry.completed,
            _id: currentEntry._id
          }
          //Conditionally build the Overdue, Completed, and Upcoming lists
          if (tempTaskList[taskListIndexer].completed) { //Add to Completed list
            tempCompletedList.push(tempTaskList[taskListIndexer])
          }
          else {
            if (tempTaskList[taskListIndexer].start < new Date()) { //Add to Overdue list
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

    }, [dates])

    const handleEventClick = (arg) => history.push(`/task/${arg.event._def.extendedProps._id}`)

    const handleDateClick = (arg) => {
      let calendarApi = calendarComponentRef.current.getApi()
      calendarApi.changeView("timeGridDay", arg.date)
    }

    return (
        <StyleWrapper>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin ]}
                ref = {calendarComponentRef}
                initialView="listYear"  // LIST view
                // initialView="dayGridMonth"  // MONTH view
                // initialView="dayGridDay"  // DAY view
                // initialView="timeGridDay"  // DAY view with TIMES
                weekends={true}
                firstDay={1}
                // businessHours={true}
                businessHours={{
                 daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday - Friday
                 startTime:'07:00', // a start time (7am in this example)
                 endTime: '18:00'  // an end time (6pm in this example)
                }}
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
                    color: 'tomato',
                  },

                  // COMPLETED Tasks
                  {
                    events: completedList,
                    color: 'silver',     // grey
                  },

                  // ACTIVE UPCOMING Tasks
                  {
                    // events: eventList,
                    events: upcomingList,
                    color: 'skyblue',     // blue
                  }
                ]}
                headerToolbar={{
                  left: 'listYear dayGridMonth,timeGridWeek,timeGridDay',
                  center: 'title',
                  right: 'today prevYear,prev,next,nextYear'
                }}
                height='auto'
            />
        </StyleWrapper>
    )
}
export default CalendarView