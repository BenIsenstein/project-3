import { useState, useEffect, useMemo } from 'react' 
import GroupOfInputs from './GroupOfInputs'
import { isValidDate } from '../../functions'

const StartAndEndDates = ({isCustomComponent, forwardErrors, readOnly, ...props}) => {
  const { watch, setValue, areDetailsLoaded, isDetailsMode } = props
  const [startEndDiff, setStartEndDiff] = useState(3600000)           //diff value between 'start' and 'end'. stored as milliseconds
  const startDateValue = watch('start')
  const endDateValue = watch('end')

  const areBothDatesInvalid = useMemo(() => (
    !isValidDate(startDateValue) && 
    !isValidDate(endDateValue)

  ), [startDateValue, endDateValue])

  // effect that watches for the FIRST user action changing one of the dates.
  // the date not changed is set to be an hour away from its sibling.
  useEffect(() => {
    if (isDetailsMode && !areDetailsLoaded) return  
    if (areBothDatesInvalid) return

    if (!isValidDate(endDateValue)) return setValue('end', new Date(startDateValue?.getTime() + startEndDiff))
    if (!isValidDate(startDateValue)) return setValue('start', new Date(endDateValue?.getTime() - startEndDiff))  

  }, [
    areDetailsLoaded, 
    areBothDatesInvalid,
    startDateValue, 
    endDateValue, 
    startEndDiff, 
    isDetailsMode, 
    setValue
  ])

  // effect that watches for user changes to 'start'. 
  // adjusts 'end' according to the startEndDiff
  useEffect(() => {
    if (isDetailsMode && !areDetailsLoaded) return  
    if (areBothDatesInvalid) return

    setValue('end', new Date(startDateValue?.getTime() + startEndDiff))

  }, [startDateValue]) 


  // effect that watched for user changes to 'end'.
  // MUST ONLY HAVE 'endDateValue' IN THE DEP ARRAY.
  // if an invalid change is made and endDateValue is an earlier date 
  // than startDateValue, set startDateValue to the startEndDiff *behind* endDateValue.
  // otherwise, change startEndDiff to match the newly selected endDateValue.
  useEffect(() => {
    if (isDetailsMode && !areDetailsLoaded) return  
    if (areBothDatesInvalid) return

    const taskLength = endDateValue?.getTime() - startDateValue?.getTime()

    if (taskLength < 0) return setValue('start', new Date(endDateValue?.getTime() - startEndDiff))
    
    setStartEndDiff(taskLength)

  }, [endDateValue])

  return <GroupOfInputs {...props} />
}

export default StartAndEndDates