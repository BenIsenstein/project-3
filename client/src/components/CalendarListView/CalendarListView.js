import { FlexSection } from '../../common'
import Accordion from '../Accordion/Accordion'
import './CalendarListView.css'

const CalendarListView = (props) => <>
  {props.dates.map((date, index) => {
   //if (!date.entries.length) return null // this ensures that the date text for empty days disappears
    
    return (
      <FlexSection key={index} column>
        <h5>{date?.date || "No date"}</h5>
        {date?.entries.map((entry, index) => <Accordion key={index} {...entry} />)}                
      </FlexSection>
    )
  })}
</>

export default CalendarListView
