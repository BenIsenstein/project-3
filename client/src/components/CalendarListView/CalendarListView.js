import React, { useEffect, useState } from "react"
import "./CalendarListView.css"

const CalendarListView = () => {
  const [entries, setEntries] = useState([{
      title: "Loading...",
      date: " ",
      item: " ",
      task: " "
  }])

  const SingleEntry = (props) => (
    <div {...props}>
      <h3>{props.task || "No title"}</h3>   
      <p>{props.date || "No date"}</p> 
      <p>{props.item || "No item"}</p>
    </div>
  )

  useEffect(() => {
    const fetchCalendarEntries = async () => {
      const monthsObject = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
      }

      const setNoneFound = () => setEntries([{
        title: "No Calendar Entries Found",
        date: " ",
        item: " ",
        task: " "
      }])

      try {
        let entriesResponse = await fetch("./api/calendarEntry/get")
        let resObject = await entriesResponse.json()
        let list = resObject.calendarEntryList

        if (!list) return setNoneFound()
        
        for (let entry of list) {
          let date = new Date(entry.date)
          let month = monthsObject[date.getMonth()]
          let day = date.getDate()
          let year = date.getFullYear()

          entry.date = `${month} ${day} ${year}`
        }

        setEntries(list) 
      }  
      catch (err) {
        setNoneFound()
        console.log(err)
        alert("There was an error loading your calendar. We're fixing it as fast as we can.")
      }
    }

    fetchCalendarEntries()
  }, [])

  return <> {entries.map((entry, index) => <SingleEntry key={index} {...entry} />)} </>
}

export default CalendarListView
