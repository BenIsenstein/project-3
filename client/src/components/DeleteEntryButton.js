import React from "react"

export default function DeleteEntryButton ( {entryId} ) {

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
      }    

    }
    catch (err) {
      console.log("Problem DELETING entry!")
    }

    /* Trigger REFRESH of Calendar entries in STATE! */

  }

    return ( 
    <div>
        <button 
          className='delete-button'
          type='button'
          // onClick={VerifyDelete()}
          onClick={() =>
            window.confirm("Are you sure you wish to delete this item?") &&
            DeleteEntry()
          }
        >
          Delete
        </button>
    </div>
    )
}
