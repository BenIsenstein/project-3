import { useHistory } from 'react-router-dom'
import FormTemplate from './FormTemplate/FormTemplate'

const AddEntry = () => {
  const history = useHistory()

  const onSubmit = async (data) => {
    data.house = "House placeholder"
    data.completed = false

    try {
      let action = "/api/calendarEntry/add"
      let options = {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      }
      let res = await fetch(action, options)
      let resObject = await res.json()

      if (!resObject.success) alert("Your entry wasn't added for some reason. Please try again.")
    }
    catch (err) {
      console.log('error adding calendar entry: ', err)
      alert("There was an error adding your entry. We're fixing it as fast as we can.")
    }

    history.push(`/calendar`)
  }

  const inputs = [
    {
      name: "item",
      registerOptions: { required: "You must choose an item." },
      maxLength: '50'
    },
    {
      name: "task",
      registerOptions: { required: "You must choose a task." },
      maxLength: '50'
    },
    {
      name: "description",
      registerOptions: { required: "You must write a description." }
    },
    {
      name: "date",
      registerOptions: { required: "You must choose a date." }
    }
  ]

  return <FormTemplate 
    titleText="New Task" 
    inputs={inputs} 
    addModeCancel={history.goBack} 
    onSubmit={onSubmit} 
  />
}

export default AddEntry