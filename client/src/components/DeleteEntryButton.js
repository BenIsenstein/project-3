import React from "react"
import { Button, TrashIcon } from '../common'
import { useDeleteEntry } from "../functions"
import ConfirmModal from './Modals/ConfirmModal'
import useConfirmModal from './Modals/useConfirmModal'

const DeleteEntryButton = ({ entryId, reRenderList, ...props }) => {
  const {isConfirmModalShowing, toggleConfirmModal} = useConfirmModal()
  const deleteEntry = useDeleteEntry()

  return <>
      <ConfirmModal
        isConfirmModalShowing={isConfirmModalShowing}
        hideConfirmModal={toggleConfirmModal}
        modalContent="Do you really wish to delete this task?"
        confirmPrompt='Delete'
        actionOnConfirm={async () => await deleteEntry(entryId)}
        actionOnCancel={()=>{}}
      />
      <Button 
        icon={props.iconButton} 
        formSubmit={props.formSubmit}
        fullWidth={props.fullWidth}
        fullHeight={props.fullHeight}
        onClick={toggleConfirmModal}
        {...props}
      >
        { props.iconButton ? <TrashIcon /> : 'Delete Task' }       
      </Button>
  </>
}
export default DeleteEntryButton