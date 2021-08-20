import { useContext } from 'react'
import UserContext from '../UserContext'
import stringRandomizer from './stringRandomizer'

const useUpdateICS = () => {

  const userContext = useContext(UserContext)

  const updateICS = async () => {
    try {
      let calendarId = ""
      // Check UserContext to see if user has an existing calFileID. If not, create one for them.
      if (!userContext.user.calFileId) {
        console.log("updateICS function says, generating a calFileId for user!")
        calendarId = stringRandomizer(12)
        // Update user profile in DB and also in Context with this new info
        let userAction = `/api/user/update/${userContext.user._id}`
        let method = 'put'
        let headers = { "content-type": "application/json" }
        let body = JSON.stringify({ calFileId: calendarId })

        // send user update request
        let userRes = await fetch(userAction, { method, headers, body })
        let userObject = await userRes.json()

        // If DB update was successful, then update UserContext
        if (userObject.success) {
          let tempUserData = { ...userContext.user }
          tempUserData.calFileId = calendarId
          userContext.setUserInfo(tempUserData)
        }
        else {
          console.log("updateICS function says, Problem updating USER!")
        }
      }
      else {
        calendarId = userContext.user.calFileId
      }

      // Delete any existing file with same name.
      let apiForDel = `/api/calFile/delete/${calendarId}`
      let delOptions = {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
      let delRes = await fetch(apiForDel, delOptions)
      let delObject = await delRes.json()

      // Recreate the new ICS file by calling the API
      let apiLocation = "/api/calFile/create"
      let options = {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id: userContext.user._id, calFileId: calendarId })
      }
      let icsRes = await fetch(apiLocation, options)
      let icsObject = await icsRes.json()
      if (icsObject.success) console.log("User ICS file replaced!")
      else console.log("Call to the calFile API failed for some reason.")
    }
    catch (err) {
      console.log("There was a general problem creating the ICS file for this user! Error = ", err)
    }
  }
  
  return updateICS

}

export {useUpdateICS}
