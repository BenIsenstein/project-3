import { useState, useEffect } from "react"
import { Button, CalendarIcon, StyledDateTimePicker } from '../../common'
import ConfirmModal from './ConfirmModal'
import useConfirmModal from './useConfirmModal'

const DatetimePickerModal = ({ watch, setValue, isAddMode, recurrenceFrequency, name, ...props}) => { 
  const { isConfirmModalShowing, toggleConfirmModal } = useConfirmModal()
  const currentValue = watch(name)
  const [date, setDate] = useState(currentValue || new Date())

  //make sure the modal always opens with the current value of the input element, if it has a value.
  useEffect(() => {
    console.log(`current value of ${name} is ${currentValue}`)
    setDate(currentValue || new Date())

    return () => console.log(`DatetimePickerModal with name "${name}" unmounted!`)

  }, [currentValue])


  // - - - - EntryDetails completion effects - - - - - - - - -
  const dateCompletedValue = watch("dateCompleted")

  // in the case of recurrenceFrequency prop, setValue to the appropriate future date.
  // This is meant to take place in a CalendarEntry completion form.
  useEffect(() => { 
    // the input is meant to be a nextRecurringDate input, 
    // the frequency value has loaded in,
    // and the input has a falsy value
    if (recurrenceFrequency && !currentValue) {
      let recurrenceDate = new Date(new Date().setHours(12,0,0))
      recurrenceDate.setDate(recurrenceDate.getDate() + recurrenceFrequency)

      setValue(name, recurrenceDate)
    }
  }, [recurrenceFrequency])

  // if the input is 'dateCompleted' and they are completing for the first time, 
  // start them off with the current date and time.
  useEffect(() => {
    if (name === "dateCompleted" && !currentValue && isAddMode) setValue(name, new Date())

  }, [name, currentValue, isAddMode, setValue])

  // watching for user changes to 'dateCompleted' 
  // and adjusting 'nextRecurringDate' accordingly
  useEffect(() => {
    if (!recurrenceFrequency) return

    const recurrenceFrequencyInMs = recurrenceFrequency * 86400000

    setValue("nextRecurringDate", new Date(dateCompletedValue?.getTime() + recurrenceFrequencyInMs))
  },[dateCompletedValue])

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