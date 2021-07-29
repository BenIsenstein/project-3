import { useHistory } from 'react-router-dom'
import SuperForm from './SuperForm/SuperForm'
import { useAddEntry } from '../functions'

const AddEntry = () => {
  const history = useHistory()
  const addEntry = useAddEntry()

  const inputs = [
    {
      name: "houseId",
      labelText: "house"
    },
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

  return <SuperForm 
    titleText="New Task" 
    inputs={inputs} 
    addModeCancel={history.goBack} 
    onSubmit={addEntry} 
  />
}

export default AddEntry