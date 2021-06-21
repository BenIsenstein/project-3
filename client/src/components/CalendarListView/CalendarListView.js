import React, { useEffect, useState } from "react";

import "./CalendarListView.css";

const CalendarListView = () => {
  const [entries, setEntries] = useState([{
      title: "Loading...",
      date: " ",
      item: " ",
      task: " "
  }]);

  const SingleEntry = (props) => (
    <div {...props}>
      <h2>{props.title || "No title"}</h2>   
      <p>{props.date || "No date"}</p> 
      <p>{props.item || "No item"}</p>
      <p>{props.task || "No task"}</p>
    </div>
  )

  useEffect(() => {
    const fetchCalendarEntries = async () => {
      const setNoneFound = () => setEntries([{
        title: "No Calendar Entries Found",
        date: " ",
        item: " ",
        task: " "
      }])

      try {
        let entriesResponse = await fetch("./api/calendar/entries/:id")
        let resObject = await entriesResponse.json()

        if (resObject.entries) setEntries(resObject.entries)
        else setNoneFound()
      }  
      catch (err) {
        setNoneFound()
        console.log(err)
        alert("There was an error loading your calendar. We're fixing it as fast as we can.")
      }
    }

    fetchCalendarEntries()
  }, [])

  return (
    <div>
        {entries.map((entry, index) => <SingleEntry key={index} {...entry} />)}
    </div>
  )
};

export default CalendarListView;
