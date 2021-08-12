import React, { useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { Page, PageContainer } from '../common'

const Confirm = () => {
  const history = useHistory()
    
  // useEffect(() => {
  //   try {
  //     // Use Query Parameters in URL to confirm user's email address and activate their account
  //     let userId = 1
  //     let code = 1

  //     // Find matching AUTH record by userId  
  //     let authRes = await fetch(`/api/auth/confirm/${userId}`)
  //     let authObject = await authRes.json()
  //     console.log("Confirm Page UseEffect says, authObject = ", authObject)
  //     if (authObject.confirmCode === code) {
  //       console.log("Confirmation codes MATCH! Enabling the account now...")

  //       // If returned AUTH record contains same confirmation code as the one provided,
  //       // then update the AUTH record to set the 'confirmed' flag and enable the account.
  //       apiRoute = `/api/auth/update/${userId}`
  //       const headers = { "content-type": "application/json" }
  //       let method = 'put'
  //       let body = JSON.stringify({ confirmCode: "", confirmed: true })

  //       // send auth update request
  //       let authUpdateRes = await fetch(authAction, { method, headers, body })
  //       let authUpdateObject = await authRes.json()
              
  //       // return if the auth update was unsuccessful
  //       if (authUpdateObject.success) {

  //         // If everything is successful, call SendInBlue API to add user email to Contact List
              
              
  //         // Finished account validation, send user directly to login screen
  //         // history.push(`/login`)

  //       }
  //       else {
  //         return alert("Your AUTH entry wasn't updated for some reason. Please try again.")
  //       }
  //     }
  //   }
  //   catch(err) {
  //     console.log(err)
  //   }
  // })

  return (
    <Page>
      <PageContainer>
        <p>Confirming valid email address...</p>
      </PageContainer>
    </Page>
  )
}

export default Confirm