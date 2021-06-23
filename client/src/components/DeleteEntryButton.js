import React from "react"
import { Button } from '../common'

export default function DeleteEntryButton ( {entryId, dates, setDates} ) {

  async function DeleteEntry() {
    try {
      let response = await fetch(`/api/calendarEntry/delete/${entryId}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(update, null, 2)
      })
      if(!response){
        console.log("Error on DELETE method.")
      }
      else{
        let data = await response.json()
        console.log(response)
        console.log(data)
        
        // Remove calendar entry from STATE and trigger a REFRESH of the list on the screen
        setDates(dates.filter((item) => item._id !== entryId))
        
      }    

    }
    catch (err) {
      console.log("Problem DELETING entry!")
    }

  }

    return ( 
    <div>
        <Button 
          className='delete-button'
          type='button'
          // onClick={VerifyDelete()}
          onClick={() =>
            window.confirm("Are you sure you wish to delete this item?") &&
            DeleteEntry()
          }
        >
          Delete
        </Button>
    </div>
    )
}
