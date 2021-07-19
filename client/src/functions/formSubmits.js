import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../UserContext'

// updateAccount submit function
const useUpdateAccount = async () => {
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
            if (isEmailChanged) {
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
            if (!userObject.success && isEmailChanged) { 
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
    useChangePassword 
}
