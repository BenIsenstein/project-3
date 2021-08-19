import { useEffect, useState } from 'react'

const useGetAllInfo = () => {
  const [allDefaultTasks, setAllDefaultTasks] = useState([])

  useEffect(() => {
    const getAllInfo = async () => {
      console.log('calling getAllInfo')
      try {
        let allTasksRes = await fetch("/api/info")
        let allTasksArray = await allTasksRes.json()
        setAllDefaultTasks(allTasksArray)
      }
      catch (err) {
        console.log("There was an error loading your table", err)
      }
    }

    getAllInfo()

    return () => console.log("getAllInfo effect - unmounting!")
  }, [])

  return allDefaultTasks
}

export { useGetAllInfo }