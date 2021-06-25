import React, { useEffect, useState, useMemo, useContext } from "react"

// import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
// import  ExpandMoreIcon  from '@material-ui/icons/ExpandMore'

// import DeleteEntryButton from '../DeleteEntryButton'
import CustomAccordion from '../Accordion/Accordion'

import UserCalendarContext from "../../UserCalendarContext"

const CalendarListView = () => {

  // Access global state in CONTEXT
  const userCalContext = useContext(UserCalendarContext)

  const testEntriesList = userCalContext.calendarEntries

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
    const fetchCalendarEntries = async () => {
      try {
        let entriesResponse = await fetch("./api/calendarEntry/get")
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

  }, [entryTemplate, setNoneFound])

  // Little component for a single calendar entry
  // const SingleEntry = (props) => {
  //   return (
  //     <Accordion {...props}>
  //       <AccordionSummary
  //         expandIcon={<ExpandMoreIcon />}
  //         id="Single-entry"
  //       >
  //         <div>
  //           <h3>{props.item || "No item"}</h3> 
  //           <p>{props.task || "No task"}</p>  
  //         </div>
             
  //       </AccordionSummary>
  //       <AccordionDetails>
  //         {props.description} 
  //         <DeleteEntryButton entryId={props._id} dates={dates} setDates={setDates} />
  //       </AccordionDetails>
  //     </Accordion>   
  //   )
  // }

  return <>
    {dates.map((date, index) => {
        return (
          <div key={index}>
              <h5>{date.date || "No date"}</h5>
              {date.entries.map((entry, index) => <CustomAccordion key={index} dates={dates} setDates={setDates} {...entry} />)}              
          </div>
        )
    })}

    {/* <div>
      {testEntriesList.map(mapItem => {
        return (
          <div key={mapItem.id}>
            {mapItem}
          </div>
        )
      })}                        
    </div> */}



  </>
}

export default CalendarListView
