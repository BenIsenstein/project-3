import React, { useEffect, useState, useMemo } from "react"
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import  ExpandMoreIcon  from '@material-ui/icons/ExpandMore'
import "./CalendarListView.css"
import DeleteEntryButton from '../DeleteEntryButton'


const CalendarListView = () => {
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
    ...entryTemplate 
  }])

  // Function in case the user's calendar is empty
  const setNoneFound = useMemo(() => 
    () => setDates([{ 
      date: "No Calendar Entries Found", 
      ...entryTemplate 
    }]), 

  [entryTemplate])

  // Effect to fetch all entries
  useEffect(() => {
    const fetchCalendarEntries = async () => {
      try {
        let entriesResponse = await fetch("./api/calendarEntry/get")
        let resObject = await entriesResponse.json()
        let list = resObject.calendarEntryList

        if (!list) return setNoneFound()

        // Make a Date object out of the entry.date ISO string,
        // Use built-in method to grab nice-looking string
        let datesArray = []

        for (let entry of list) { 
          let date = new Date(entry.date).toDateString()
          entry.date = date
          if (!datesArray.includes(date)) datesArray.push(date)
        }

        datesArray = datesArray.map(date => {return {date: date, entries: [] }})
          
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

  }, [entryTemplate, setNoneFound])

  // Little component for a single calendar entry
  const SingleEntry = (props) => {
    let h3 = { fontSize: "20px" }

    return (
      <Accordion {...props}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="Single-entry"
        >
          <div>
            <h3 style={h3}>
              {props.task || "No task"}
            </h3> 
            <p>{props.item || "No item"}</p>  
          </div>
             
        </AccordionSummary>
        <AccordionDetails>
          {props.description} 
          <DeleteEntryButton entryId="60d21df7b32d0c334cde6928" />
        

        </AccordionDetails>
      </Accordion>    
    )
  }

  

  return <>
    {dates.map((date, index) => {
        return (
          <div key={index}>
            <h2>{date.date || "No date"}</h2>
            {date.entries.map((entry, index) => <SingleEntry key={index} {...entry} />)}
          </div>
        )
      }) 
    }
  </>
}

export default CalendarListView
