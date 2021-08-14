import { useState, useEffect } from "react"
import { Button, CalendarIcon, StyledDateTimePicker } from '../../common'
import ConfirmModal from './ConfirmModal'
import useConfirmModal from './useConfirmModal'

const DatetimePickerModal = ({ watch, name, ...props}) => { 
  const { isConfirmModalShowing, toggleConfirmModal } = useConfirmModal()
  const currentValue = watch(name)
  const [date, setdate] = useState(currentValue || new Date())

  //make sure the modal always opens with the current value of the input element, if it has a value.
  useEffect(() => setdate(currentValue || new Date()), [currentValue])

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
        props.setValue(name, date)
      }
    />
    <Button type='button' onClick={toggleConfirmModal} {...props}>
      { props.iconButton ? <CalendarIcon /> : 'Delete Event' }       
    </Button>
  </>
}

export default DatetimePickerModal