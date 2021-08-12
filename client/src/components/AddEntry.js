import { useHistory } from 'react-router-dom'
import SuperForm from './SuperForm/SuperForm'
import { useAddEntry } from '../functions'
import UserHomesSelect, { HomeItemsSelect } from './SuperForm/DynamicSelects'

const AddEntry = () => {  
  const history = useHistory()
  const addEntry = useAddEntry()

  const inputs = [
    {
      name: "homeId",
      labelText: "home",
      isCustomComponent: true,
      as: UserHomesSelect
    },
    {
      name: "item",
      isCustomComponent: true,
      as: HomeItemsSelect
    },
    {
      name: "task",
      registerOptions: { required: "You must choose a task." },
      maxLength: '50'
    },
    {
      name: "notes",
    },
    {
      name: 'serviceProviderInfo',
      labelText: 'Service Provider'
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