import React from "react"
import { useHistory } from 'react-router-dom'
import { Button, TrashIcon } from '../common'
import './DeleteEntryButton.css'

import ConfirmModal from './modals/ConfirmModal'
import useConfirmModal from './modals/useConfirmModal'

const DeleteEntryButton = ({ entryId, reRenderList, ...props }) => {

  const {isConfirmModalShowing, toggleConfirmModal} = useConfirmModal()

  let history = useHistory()
  
  async function DeleteEntry() {
    try {
      let response = await fetch(`/api/calendarEntry/delete/${entryId}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response) {
        console.log("Error on DELETE method.")
      }
      else {
        let resObject = await response.json()
        
        if (!resObject.success) {
          alert("Your entry wasn't deleted for some reason. We're working on it.")
        }
        else { // Deletion was successful. Refresh page or redirect back to calendar.
          if (reRenderList) { // Call reRenderList function if it was provided in props
            reRenderList()
          }
          else { // reRenderList function was NOT provided in props, so just redirect to calendar. 
            history.push(`/calendar`)
          }
        }
        
      }    
    }
    catch (err) {
      console.log("Problem DELETING entry!")
    }

  }

  return ( 
    <div>
      <ConfirmModal
        isConfirmModalShowing={isConfirmModalShowing}
        hideConfirmModal={toggleConfirmModal}
        message="Do you really wish to delete this event?"
        actionOnConfirm={DeleteEntry}
      />
      <Button icon={props.iconButton} formSubmit={props.formSubmit} onClick={toggleConfirmModal}>
        { props.iconButton ? <TrashIcon /> : 'DELETE' }       
      </Button>
    </div>
  )
}
export default DeleteEntryButton