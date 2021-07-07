import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

const TaskDetailsEdit = () => {

    let [task, setTask] = useState()
    let [saveError, setSaveError] = useState()
    let history = useHistory()

    const { id } = useParams()


    async function updateTask() {
        // update the task in state and put it into a variable
        let editedTaskList = tasks.map(task => (id === task.id) ? {...task, name: newName} : task)
        let taskToUpdate = editedTaskList.find((task) => task.id === id)
        // define info for fetch()
        let fetchUrl = `/api/calendarEntry/update/${updateTask.id}`
        let fetchOptions = {
          method: 'put',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(taskToUpdate)
        }
    
        try {
          let putResponse = await fetch(fetchUrl, fetchOptions)
          let resObject = await response.json()
          console.log('Edit entry res status: ', response.status)
          setTasks(editedTaskList)

        }
        catch (err) {
          alert("There was an error editing your entry. We're solving it as fast as we can.")
          console.error('Error submitting entry to server!', err)
        }
      }

}
    
    
    
    