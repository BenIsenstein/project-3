import { useHistory } from 'react-router-dom'
import SuperForm from './SuperForm/SuperForm'
import { useAddEntry } from '../functions'
import UserHomesSelect, { HomeItemsSelect, useItemTasksSelect } from './SuperForm/DynamicSelects'
import GroupOfInputs from './SuperForm/GroupOfInputs'
import StartAndEndDates from './SuperForm/StartAndEndDates'

const AddEntry = () => {  
  const history = useHistory()
  const addEntry = useAddEntry()
  const { ItemTasksSelect } = useItemTasksSelect()
  //const { SuperForm } = useSuperForm()
  
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
      isCustomComponent: true,
      as: ItemTasksSelect,
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
    onSubmit={addEntry} 
  />
}

export default AddEntry