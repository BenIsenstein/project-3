import React, { useEffect } from "react"
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { Page, PageContainer, FlexSection, GridSection, Button } from '../common'
import { addSiBContact } from '../functions'

const Confirm = () => {
  const history = useHistory()

  let { search } = useLocation()
  let { data1, data2 } = queryString.parse(search)

  useEffect(() => {
    const confirmAuth = async () => {
      try {
        // Use Query Parameters in URL to confirm user's email address and activate their account
        let userId = data1
        let code = data2

        // Find matching AUTH record by userId  
        let authRes = await fetch(`/api/auth/confirm/${userId}`)
        let authObject = await authRes.json()
        
        if ((authObject.confirmCode === code) && (authObject.confirmed == false)) { 
          console.log("Confirmation codes MATCH! Enabling the account now...")

          // If returned AUTH record contains same confirmation code as the one provided,
          // then update the AUTH record to set the 'confirmed' flag and enable the account.
          let apiRoute = `/api/auth/update/${userId}`
          const headers = { "content-type": "application/json" }
          let method = 'put'
          let body = JSON.stringify({ confirmCode: "", confirmed: true })

          // send auth update request
          let authUpdateRes = await fetch(apiRoute, { method, headers, body })
          let authUpdateObject = await authUpdateRes.json()

          if ((authUpdateObject.success) && (authUpdateRes.status == 200)) {
            console.log("Successful update to activate AUTH account!")

            // If everything is successful, call SendInBlue API to add user email to Contact List.
            let userRes = await fetch(`/api/user/get/${userId}`) // Use the userId from the URL query string to retrieve user's first and last name.
            let userObj = await userRes.json()
            await addSiBContact(authObject.email, userObj.firstName, userObj.lastName)

            // Finished account validation, send user directly to login screen
            history.push(`/login`)

          }
          else {
            return alert("Your AUTH entry wasn't updated for some reason. Please try again.")
          }
        }
        else {
          console.log("No Auth account to update. Either account has already been confirmed or activation codes do not match!")
        }
      }
      catch (err) {
        console.log(err)
      }
    }
    confirmAuth()
  },[])  //empty guard array. Only run this useEffect ONCE at time of initial render!

  return (
    <Page noBackground>
      <PageContainer>
          <p>Confirming valid email address and activating your account...</p>
          <br/>
          <p>If you are not redirected to login within 5 seconds, please click Log In.</p>
      </PageContainer>
    </Page>
  )
}

export default Confirm