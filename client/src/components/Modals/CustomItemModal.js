import { useState } from "react"
import { Button, AddIcon, PencilIcon, TrashIcon } from '../../common'
import ConfirmModal from './ConfirmModal'
import useConfirmModal from './useConfirmModal'

const CustomItemModal = props => {
  const { isConfirmModalShowing, toggleConfirmModal } = useConfirmModal()

  return <>
    <ConfirmModal
      isConfirmModalShowing={isConfirmModalShowing}
      hideConfirmModal={toggleConfirmModal}
      modalContentProps={{column: true}}
      modalContent={props.modalContent}
      confirmPrompt='Add item'
      actionOnConfirm={props.actionOnConfirm}
    />
    <Button text type='button' onClick={toggleConfirmModal} {...props}>
      <AddIcon sm />add your own item      
    </Button>
  </>
}

const EditItemModal = props => {
  const { isConfirmModalShowing, toggleConfirmModal } = useConfirmModal()

  return <>
    <ConfirmModal
      isConfirmModalShowing={isConfirmModalShowing}
      hideConfirmModal={toggleConfirmModal}
      modalContentProps={{column: true}}
      modalContent={props.modalContent}
      confirmPrompt="Edit"
      actionOnConfirm={props.actionOnConfirm}
    />
    <Button text type='button' onClick={toggleConfirmModal} {...props}>
      <PencilIcon sm /> 
    </Button>
  </>
}

const DeleteItemModal = props => {
  const { isConfirmModalShowing, toggleConfirmModal } = useConfirmModal()

  return <>
    <ConfirmModal
      isConfirmModalShowing={isConfirmModalShowing}
      hideConfirmModal={toggleConfirmModal}
      modalContentProps={{column: true}}
      modalContent={`Are you sure you want to delete "${props.labelText || props.value}"?`}
      confirmPrompt="Delete"
      actionOnConfirm={props.actionOnConfirm}
    />
    <Button text type='button' onClick={toggleConfirmModal} {...props}>
      <TrashIcon sm /> 
    </Button>
  </>
}

export default CustomItemModal
export { EditItemModal, DeleteItemModal }



//`Edit ${props.labelText || props.value}`