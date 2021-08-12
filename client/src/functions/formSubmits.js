import { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import UserContext from '../UserContext'


//updateEntry
const useUpdateEntry = () => {
  const { id } = useParams()
  const history = useHistory()

  const updateEntry = async (data) => {
    try {
      if (data.dateCompleted) data.completed = true

      let options = {
        method: "put",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      }
      let res = await fetch(`/api/calendarEntry/update/${id}`, options)
      let resObject = await res.json()
      
      if (!resObject.success) return alert("Your entry wasn't updated for some reason. Please try again.")
      history.goBack()
    }
    catch(err) {
      console.log('error updating calendar entry: ', err)
      alert("There was an error updating your entry. We're fixing it as fast as we can.")
    }
  }  

  return updateEntry

}

const fetchAddEntry = async (data) => {
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
}

// addEntry
const useAddEntry = () => {
  const history = useHistory()

  const addEntry = async (data) => {
    data.completed = false

    await fetchAddEntry(data)

    history.push(`/calendar`)
  }

  return addEntry
}

// addHome
const useAddHome = () => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  const [taskInfo, setTaskInfo] =  useState([])

  useEffect(() => {
    const getAllInfo = async () => {
     // console.log('calling getAllInfo')
      try {
        let response = await fetch("/api/info")
        let allTasksArray = await response.json()
        setTaskInfo(allTasksArray)
      }
      catch (err) {
        console.log("There was an error loading your table", err)
      }
    }

    getAllInfo()

   // return () => console.log("getAllInfo effect - unmounting!")
  }, [])

  const addHome = async (data) => {
    data.activated = true
    let addHomeObject
    
    try {
      let action = "/api/home/add"
      let options = {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      }
      let addHomeRes = await fetch(action, options)
      addHomeObject = await addHomeRes.json()
      console.log('addHomeObject: ', addHomeObject)

      if (!addHomeObject.success) return alert("Your home wasn't added for some reason. Please try again.")

      userContext.setUserInfo(userInfo => data && { ...userInfo, homes: [...userInfo.homes, data] })
    }
    catch (err) {
      console.log('error adding calendar entry: ', err)
      return alert("There was an error adding your entry. We're fixing it as fast as we can.")
    }

    // add default entries based on industry standards from info table
    let selectedItems = Object.keys(data.homeItems).filter(key => data.homeItems[key])
    let relevantTasks = taskInfo.filter(task => selectedItems.includes(task.item))
    relevantTasks = [...relevantTasks,...data.customTasks]
    let newCalendarEntries = relevantTasks.map(taskObject => {
     
      let currentDate = new Date()
      let defaultDate= new Date(currentDate) 
        defaultDate.setDate(defaultDate.getDate() + taskObject.frequency  )


      return {
        completed: false,
        userId: data.userId,
        homeId: addHomeObject.homeId,
        item: taskObject.item,
        task: taskObject.task,
        notes: "We'll get the right info here eventually!",
        start: defaultDate ,
        end: defaultDate
      }
    })

    for (let newEntry of newCalendarEntries) await fetchAddEntry(newEntry)

    history.push(`/account`)
  }

  return addHome
}

//   // create a schedule of new events based on industry/custom frequency

// //   for (every default item.frequency) {
// //     let tempDate = new Date (new Date().getTime() + (i *24 * 60 * 60 *1000))
// // }
// setDates( start, end, [ options ] )


// update Home
const useUpdateHome = () => {
  const { id } = useParams()
  const history = useHistory()

  const updateHome = async (data) => {

    try {
      let options = {
        method: "put",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      }
      let res = await fetch(`/api/home/update/${id}`, options)
      let resObject = await res.json()
      
      if (!resObject.success) return alert("Your home details wasn't updated for some reason. Please try again.")
      history.push('/account')
    }
    catch(err) {
      console.log('error updating calendar entry: ', err)
      alert("There was an error updating your home details. We're fixing it as fast as we can.")
    }
  }  

  return updateHome

}

// updateAccount submit function
const useUpdateAccount = () => {
    const history = useHistory()
    const userContext = useContext(UserContext)
   
    const updateAccount = async (data) => {

        try {
            let isEmailChanged = data.email !== userContext.user.email  
            let authAction = `/api/auth/update/${userContext.user._id}`
            let userAction = `/api/user/update/${userContext.user._id}`
            let method = 'put'
            let headers = { "content-type": "application/json" }
            let body
      
            // if the user wants to change their email, start by updating their auth record
            // the only values in the request body are the new email and new dateLastModified
            if (data.email && isEmailChanged) {
              body = JSON.stringify({ email: data.email, dateLastModified: new Date() })
      
              // send auth update request
              let authRes = await fetch(authAction, { method, headers, body })
              let authObject = await authRes.json()
      
              // return if the auth update was unsuccessful
              if (!authObject.success) return alert("Your entry wasn't updated for some reason. Please try again.")
            }
            // redefine body with all of the form data
            body = JSON.stringify(data)
      
            // send user update request
            let userRes = await fetch(userAction, { method, headers, body }) 
            let userObject = await userRes.json()
      
            // if the update was unsuccessful, reverse the email change made to the auth document
            if (!userObject.success && data.email && isEmailChanged) { 
              body = JSON.stringify({ email: userContext.user.email })
              let authCorrection = await fetch(authAction, { method, headers, body })
              let correctionObject = await authCorrection.json()
      
              // return if the auth correction was unsuccessful
              if (!correctionObject.success) return alert("Your entry update failed halfway through. Please contact customer service.")
            }
      
            // make sure the data for context update includes _id and dateSignedUp
            // set all context to match the account changes and redirect 
            for (let key of ['dateSignedUp', '_id']) data[key] = userContext.user[key]
            userContext.setUserInfo(data)
            history.push("/calendar")
        }
          catch(err) {
            console.log('error updating account: ', err)
            alert("There was an error updating your account. We're fixing it as fast as we can.")
        } 
    }
     
    return updateAccount
} 

const useChangePassword = () => {
    const history = useHistory()
    const userContext = useContext(UserContext)

    const changePassword = async (data) => {
        try {
          const options = {
            method: 'put',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ ...data, username: userContext.user?.email })
          }
        
          let passwordRes = await fetch('/api/auth/change-password', options)
          
          if (passwordRes.status === 401) return alert("Verification failed. Please make sure your password is correct.")
          
          let passwordObject = await passwordRes.json()
          
          if (!passwordObject.success) return alert("Your password failed to update for some reason. We're working on it.")
      
          alert("Your password was successfully changed.")
          history.push('/calendar')
        }
        catch(err) {
          console.log('error updating password: ', err)
          alert("Something went wrong.")
        }
    }

    return changePassword   
}

export { 
  useUpdateAccount, 
  useChangePassword,
  useAddEntry,
  useUpdateEntry,
  useAddHome,
  useUpdateHome
}
