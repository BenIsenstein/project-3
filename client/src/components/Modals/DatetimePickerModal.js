import { useState } from "react"
import { Button, CalendarIcon, StyledDateTimePicker } from '../../common'
import ConfirmModal from './ConfirmModal'
import useConfirmModal from './useConfirmModal'

const DatetimePickerModal = ({ isDateRange, ...props }) => {
  const { isConfirmModalShowing, toggleConfirmModal } = useConfirmModal()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const dateRangeString =  startDate + ' - ' + endDate 

  const ModalContent = () => <>
    <p>{isDateRange ? "From" : "Date"}</p>
    <StyledDateTimePicker
      onChange={setStartDate}
      value={startDate}
    />

    {isDateRange && <>
      <p>To</p>
      <StyledDateTimePicker
        onChange={setEndDate}
        value={endDate}
      />
    </>}
  </>

  return <>
    <ConfirmModal
      isConfirmModalShowing={isConfirmModalShowing}
      hideConfirmModal={toggleConfirmModal}
      modalContentProps={{column: true}}
      modalContent={<ModalContent />}
      confirmPrompt='Set date'
      actionOnConfirm={() => 
        props.setValue(props.nameForUpdate, isDateRange ? dateRangeString : startDate)
      }
    />
    <Button type='button' onClick={toggleConfirmModal} {...props}>
      { props.iconButton ? <CalendarIcon /> : 'Delete Event' }       
    </Button>
  </>
}

export default DatetimePickerModal