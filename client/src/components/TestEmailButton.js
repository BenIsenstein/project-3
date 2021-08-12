import React, { useContext } from 'react'
import { EnvelopeIcon } from '../common'
import UserContext from '../UserContext'

const TestEmailButton = () => {

  const userContext = useContext(UserContext)

  const notifyByEmail = async () => {
    let action = "/api/sendEmail/user"  // Endpoint for GROUP: replace 'user' with 'group'
    let options = {
      method: 'post',
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        "type": "reminder",  // TYPE is choice of: 'test', 'reminder', 'welcome', 'emailChange', 'overdue'.
        "email": `${userContext.user.email}`,
        "userid": `${userContext.user._id}`,
        "firstname": `${userContext.user.firstName}`,
        "home": "79 Panora Hts",
        "item": "Gutters",
        "task": "this is the task",
        "description": "task described",
        "date": "date to be performed"
      })
    }

    try {
      let res = await fetch(action, options)
      let resObject = await res.json()
      console.log("Response from server = ", resObject)
      if (!resObject.success) alert("Your call to the sendEmail API failed for some reason. Please try again.")
    }
    catch (err) {
      console.log('error calling sendEmail API: ', err)
      alert("There was an error calling the sendEmail API. We're fixing it as fast as we can.")
    }
  }

  return <>
    <EnvelopeIcon onClick={notifyByEmail} />
  </>
}
export default TestEmailButton