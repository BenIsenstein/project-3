import { useState, useEffect, useMemo } from 'react' 
import GroupOfInputs from './GroupOfInputs'

const StartAndEndDates = (props) => {
  const { watch, setValue, areDetailsLoaded, isDetailsMode } = props
  const [startEndDiff, setStartEndDiff] = useState(3600000)           //diff value between 'start' and 'end'. stored as milliseconds
  const startDateValue = watch('start')
  const endDateValue = watch('end')
  const isValidDate = (date) => (
    date && 
    Object.prototype.toString.call(date) === "[object Date]" && 
    !isNaN(date)
  )

  const areBothDatesInvalid = useMemo(() => (
    !isValidDate(startDateValue) && 
    !isValidDate(endDateValue)

  ), [startDateValue, endDateValue])

  /* a bit on the function isValidDate --- from https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date/44198641#44198641
  
  " - date checks whether the parameter was not a falsy value (undefined, null, 0, "", etc..)

  - Object.prototype.toString.call(date) returns a native string representation of the given 
  object type - In our case "[object Date]". Because date.toString() overrides its parent method, 
  we need to .call or .apply the method from Object.prototype directly which .. Bypasses user-defined 
  object type with the same constructor name (e.g.: "Date")
  Works across different JS contexts (e.g. iframes) in contrast to instanceof or Date.prototype.isPrototypeOf.

  - !isNaN(date) finally checks whether the value was not an Invalid Date.""
  */

  const inputs = [
    {
      name: "start",
      labelText: "starts",
      registerOptions: { required: "You must choose a start date." }
    },
    {
      name: "end",
      labelText: "ends",
      registerOptions: { required: "You must choose an end date." }
    }
  ]

  useEffect(() => {
    console.log("")
    console.log("")
    console.log('date startDateValue: ', startDateValue)

  }, [startDateValue])

  useEffect(() => {
    console.log("")
    console.log("")
    console.log('date endDateValue: ', endDateValue)

  }, [endDateValue])

  // effect that watches for the FIRST user action changing one of the dates.
  // the date not changed is set to be an hour away from its sibling.
  useEffect(() => {
    console.log("effect watching for first date change firing")  

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
    console.log("effect watching for changes to 'start' firing")
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

  return <GroupOfInputs {...props} inputs={inputs} />
}

export default StartAndEndDates