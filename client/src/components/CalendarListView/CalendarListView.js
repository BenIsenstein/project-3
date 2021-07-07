import React, { useEffect, useState, useMemo, useContext } from "react"
import UserContext from '../../UserContext'

import Accordion from '../Accordion/Accordion'
import './CalendarListView.css'

const CalendarListView = ({ reRenderList}) => {
  
  // Capture the current state of the logged in user
  let userContext = useContext(UserContext)

  // Template for declaring useState() and setNoneFound()
  const entryTemplate = useMemo(() => {
    return { 
      date: " ", 
      entries: [{ title: " ", date: " ", item: " ", task: " " }] 
    }
  }, [])

  // State for entries
  const [dates, setDates] = useState([{ 
    date: "Loading...", 
    entries: entryTemplate.entries 
  }])

  // Function in case the user's calendar is empty
  const setNoneFound = useMemo(() => 
    () => setDates([{ 
      date: "No Calendar Entries Found", 
      entries: entryTemplate.entries  
    }]), 

  [entryTemplate])

  // Effect to fetch all entries
  useEffect(() => {
    if (userContext.isLoggedIn) {
      const fetchCalendarEntries = async () => {
        setDates([{ 
          date: "Loading...", 
          entries: entryTemplate.entries 
        }])
      
        try {
          // fetch all calendar entries for current authenticated user
          let entriesResponse = await fetch(`/api/calendarEntry/getbyuser/${userContext.user._id}`)
          let resObject = await entriesResponse.json()
          let list = resObject.calendarEntryList

          if (!list) return setNoneFound()

          // Make a Date object out of the entry.date ISO string,
          // Use built-in method to grab nice-looking string
          let datesArray = []

          // Fill datesArray with a string for each unique date
          for (let entry of list) {
            let date = new Date(entry.date).toDateString()
            entry.date = date
            if (!datesArray.includes(date)) datesArray.push(date)
          }

          // Turn each date string into the full structure with an empty array for <SingleEntries />
          datesArray = datesArray.map(date => {return {date: date, entries: [] }})
          
          // Fill each date with matching entries
          for (let date of datesArray) {
            for (let entry of list) {
              if (entry.date === date.date) {
                delete entry.date
                date.entries.push(entry)
              }
            }
          }
        
          setDates(datesArray) 
        }  
        catch (err) {
          setNoneFound()
          console.log(err)
          alert(`
            There was an error loading your calendar. 
            We're fixing it as fast as we can.
          `)
        }
      }

      fetchCalendarEntries()
    }
  }, [entryTemplate, setNoneFound, reRenderList])

  return <>
    {dates.map((date, index) => {
        return (
          <div key={index} className='calendar-list-entry-container'>
            <div className='list-date'>
              <h5>{date.date || "No date"}</h5>
            </div>
            <div className='list-entry'>
              {date.entries.map((entry, index) => <Accordion reRenderList={reRenderList} key={index} {...entry} />)}               
            </div>
             
          </div>
        )
    })}
  </>
}

export default CalendarListView
