import { useState } from "react"
import { Button, AddIcon } from '../../common'
import ConfirmModal from './ConfirmModal'
import useConfirmModal from './useConfirmModal'

const CustomItemModal = ({ isDateRange, ...props }) => {
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

export default CustomItemModal