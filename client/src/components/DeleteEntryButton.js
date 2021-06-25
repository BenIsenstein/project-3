import React from "react"
import { Button, TrashIcon } from '../common'
import './DeleteEntryButton.css'

import ConfirmModal from './modals/ConfirmModal'
import useConfirmModal from './modals/useConfirmModal'

export default function DeleteEntryButton ({ entryId, reRenderList }) {

  const {isConfirmModalShowing, toggleConfirmModal} = useConfirmModal()
  
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
      else {
        let resObject = await response.json()
        
        if (!resObject.success) alert("Your entry wasn't deleted for some reason. We're working on it.")

        // Remove calendar entry from STATE and trigger a REFRESH of the list on the screen
       // setDates(dates.filter((item) => item._id !== entryId))
        // setDates(dates
        //   .map((item) => {
        //     return {
        //       date: item.date,
        //       entries: item.entries.filter(entry => entry._id !== entryId)
        //     } 
        //   })
        //   .filter(item => {
        //     return item.entries.length > 0
        //   })
        // )
      }    
    }
    catch (err) {
      console.log("Problem DELETING entry!")
    }

    reRenderList()
    //window.location.reload()

  }

  return ( 
    <div>
      <ConfirmModal
        isConfirmModalShowing={isConfirmModalShowing}
        hideConfirmModal={toggleConfirmModal}
        message="Are you sure you wish to remove this task?"
        actionOnConfirm={DeleteEntry}
      />
      <Button 
        className='delete-button'
        // type='button'
        // onClick={VerifyDelete()}
        // onClick=          
        //   {() =>
        //     window.confirm("Are you sure you wish to delete this item?") &&
        //     DeleteEntry()
        //   } 
        onClick={toggleConfirmModal}
      >
        <TrashIcon />
      </Button>
    </div>
  )
}
