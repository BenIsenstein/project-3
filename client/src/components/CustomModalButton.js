import { useState } from "react"
import { Button, TrashIcon, CalendarIcon, StyledDateTimePicker } from '../common'
import ConfirmModal from './Modals/ConfirmModal'
import useConfirmModal from './Modals/useConfirmModal'

const CustomModalButton = props => {
  const {isConfirmModalShowing, toggleConfirmModal} = useConfirmModal()
  const [value, onChange] = useState()


  return <>
      <ConfirmModal
        isConfirmModalShowing={isConfirmModalShowing}
        hideConfirmModal={toggleConfirmModal}
        modalContent={<StyledDateTimePicker
          onChange={onChange}
          value={value}
        />}
        confirmPrompt='Set date'
        actionOnConfirm={() => props.actionOnConfirm(props.nameForUpdate, value)}
      />
      <Button type='button' onClick={toggleConfirmModal} {...props}>
        { props.iconButton ? <CalendarIcon /> : 'Delete Event' }       
      </Button>
  </>
}
export default CustomModalButton