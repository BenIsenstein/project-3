import { useHistory } from 'react-router-dom'
import SuperForm from './SuperForm/SuperForm'
import { useAddEntry, useUpdateICS } from '../functions'
import UserHomesSelect, { HomeItemsSelect, useItemTasksSelect } from './SuperForm/DynamicSelects'
import StartAndEndDates from './SuperForm/StartAndEndDates'

const AddEntry = () => {  
  const history = useHistory()
  const addEntry = useAddEntry()
  const updateICS = useUpdateICS()
  const { ItemTasksSelect } = useItemTasksSelect()
  
  const inputs = [
    {
      name: "homeId",
      labelText: "home",
      isCustomComponent: true,
      as: UserHomesSelect,
      asName: "UserHomesSelect",
    },
    {
      name: "item",
      isCustomComponent: true,
      as: HomeItemsSelect,
      asName: "HomeItemsSelect",
    },
    {
      name: "task",
      isCustomComponent: true,
      as: ItemTasksSelect,
      asName: "ItemTasksSelect",
      registerOptions: { required: "You must choose a task." }
    },
    {
      name: "notes",
      placeholder: "< ...service providers, description, etc  >"
    },
    {
      isCustomComponent: true,
      forwardErrors: true,
      readOnly: true,
      as: StartAndEndDates,
      asName: "StartAndEndDates",
      inputs: [
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
    }
  ]

  return <SuperForm 
    titleText="New Task" 
    inputs={inputs} 
    addModeCancel={history.goBack} 
    onSubmit={async (data) => {await addEntry(data); await updateICS()}} 
  />
}

export default AddEntry