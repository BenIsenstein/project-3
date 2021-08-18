import { useState, useEffect } from "react"
import { Button, CalendarIcon, StyledDateTimePicker } from '../../common'
import ConfirmModal from './ConfirmModal'
import useConfirmModal from './useConfirmModal'
import { isValidDate } from "../../functions"

const DatetimePickerModal = ({ watch, setValue, isAddMode, recurrenceFrequency, isCompleted, name, ...props}) => { 
  const { isConfirmModalShowing, toggleConfirmModal } = useConfirmModal()
  const currentValue = watch(name)
  const [modalDate, setModalDate] = useState(currentValue || new Date())
  const [mostRecentValidDate, setMostRecentValidDate] = useState(currentValue, new Date())

  // tracking the last valid date value
  useEffect(() => setMostRecentValidDate(prevState => isValidDate(currentValue) ? currentValue : prevState), [currentValue])

  // ensuring all date inputs have invalid date values handled
  useEffect(() => !isValidDate(currentValue) && setValue(name, mostRecentValidDate), [currentValue])

  //make sure the modal always opens with the current value of the input element, if it has a value.
  useEffect(() => {
    console.log(`current value of ${name} is ${currentValue}`)
    setModalDate(currentValue || new Date())

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
    if (name === "dateCompleted" && !currentValue && !isCompleted) setValue("dateCompleted", new Date())

  }, [name, currentValue, setValue, isCompleted])

  // watching for user changes to 'dateCompleted' 
  // and adjusting 'nextRecurringDate' accordingly
  useEffect(() => {
    if (!recurrenceFrequency) return
    if (!isValidDate(dateCompletedValue)) return

    const recurrenceFrequencyInMs = recurrenceFrequency * 86400000

    setValue("nextRecurringDate", new Date(new Date(dateCompletedValue?.getTime() + recurrenceFrequencyInMs).setHours(12,0,0)))
  
  },[dateCompletedValue])

  const ModalContent = () => <>
    <p>{props.modalTitle}</p>
    <StyledDateTimePicker
      autoFocus
      closeWidgets
      onChange={setModalDate}
      value={modalDate}
    />
  </>

  return <>
    <ConfirmModal
      isConfirmModalShowing={isConfirmModalShowing}
      hideConfirmModal={toggleConfirmModal}
      modalContentProps={{column: true}}
      modalContent={<ModalContent />}
      confirmPrompt='Confirm'
      actionOnConfirm={() => setValue(name, modalDate)}
      actionOnCancel={()=>{}}
    />
    <Button type='button' onClick={toggleConfirmModal} {...props}>
      { props.iconButton ? <CalendarIcon /> : 'Delete Event' }       
    </Button>
  </>
}

export default DatetimePickerModal