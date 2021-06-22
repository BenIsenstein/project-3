import React, { useEffect, useState, useMemo } from "react"
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import  ExpandMoreIcon  from '@material-ui/icons/ExpandMore'
import "./CalendarListView.css"

const CalendarListView = () => {
  // Template for declaring useState() and setNoneFound()
  const entryTemplate = useMemo(() => {
    return { title: " ", date: " ", item: " ", task: " " }
  }, [])

  // State for entries
  const [entries, setEntries] = useState([{ 
    title: "Loading...", 
    ...entryTemplate 
  }])

  // Function in case the user's calendar is empty
  const setNoneFound = useMemo(() => 
    () => setEntries([{ 
      title: "No Calendar Entries Found", 
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
        for (let entry of list) entry.date = new Date(entry.date).toDateString()
        
        setEntries(list) 
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
    let h2 = { fontSize: "20px" }
    let marginRight = { marginRight: '15px' }

    return (
      <Accordion {...props}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="Single-entry"
        >
          <div style={marginRight}>
            <h2 style={h2}>
              {props.task || "No task"}
            </h2> 
            <p>{props.item || "No item"}</p>  
          </div>
          <p>
            {props.date || "No date"}
          </p>     
        </AccordionSummary>
        <AccordionDetails>
          {props.description} 
        </AccordionDetails>
      </Accordion>    
    )
  }

  

  return <>
    { entries.map((entry, index) => <SingleEntry key={index} {...entry} />) }
  </>
}

export default CalendarListView
