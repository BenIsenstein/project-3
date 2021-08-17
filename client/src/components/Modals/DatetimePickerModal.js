import { useState, useEffect } from "react"
import { Button, CalendarIcon, StyledDateTimePicker } from '../../common'
import ConfirmModal from './ConfirmModal'
import useConfirmModal from './useConfirmModal'

const DatetimePickerModal = ({ watch, setValue, selectedTask, recurrenceDate, name, ...props}) => { 
  const { isConfirmModalShowing, toggleConfirmModal } = useConfirmModal()
  const currentValue = watch(name)
  const [date, setDate] = useState(currentValue || new Date())

  // in the case of recurrenceDate prop, setValue to that prop's value.
  // This is meant to take place in a CalendarEntry completion form.
  useEffect(() => 
    recurrenceDate && // this is meant to be a recurrenceDate input
    !currentValue && // the input has a falsy value
    selectedTask && // a task value has finally loaded in
    setValue(name, recurrenceDate), 

    [recurrenceDate, selectedTask]
  )

  //make sure the modal always opens with the current value of the input element, if it has a value.
  useEffect(() => {
    console.log(`current value of ${name} is ${currentValue}`)
    setDate(currentValue || new Date())

    return () => console.log(`DatetimePickerModal with name "${name}" unmounted!`)

  }, [currentValue])

  const ModalContent = () => <>
    <p>{props.modalTitle}</p>
    <StyledDateTimePicker
      onChange={setDate}
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
      actionOnConfirm={() => setValue(name, date)}
    />
    <Button type='button' onClick={toggleConfirmModal} {...props}>
      { props.iconButton ? <CalendarIcon /> : 'Delete Event' }       
    </Button>
  </>
}

export default DatetimePickerModal