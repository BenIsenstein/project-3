import { useState } from "react"
import { Button, CalendarIcon, StyledDateTimePicker } from '../../common'
import ConfirmModal from './ConfirmModal'
import useConfirmModal from './useConfirmModal'

const DatetimePickerModal = ({ isDateRange, ...props }) => {
  const { isConfirmModalShowing, toggleConfirmModal } = useConfirmModal()
  const [date, setdate] = useState(props.openModalWithNewDate && new Date())

  const ModalContent = () => <>
    <p>{props.modalTitle}</p>
    <StyledDateTimePicker
      onChange={setdate}
      value={date}
    />
  </>

  return <>
    <ConfirmModal
      isConfirmModalShowing={isConfirmModalShowing}
      hideConfirmModal={toggleConfirmModal}
      modalContentProps={{column: true}}
      modalContent={<ModalContent />}
      confirmPrompt='Confirm'
      actionOnConfirm={() => 
        props.setValue(props.nameForUpdate, date)
      }
    />
    <Button type='button' onClick={toggleConfirmModal} {...props}>
      { props.iconButton ? <CalendarIcon /> : 'Delete Event' }       
    </Button>
  </>
}

export default DatetimePickerModal