import React, { useEffect, useState } from 'react'
import { Button } from '../common'

// This component requires a TASK ID for input.
// A GOOGLE MAPS window will be opened based on search criteria
// extracted from details of the TASK and its associated HOME. 
const FindServicesButton = ({ taskId }) => {

  const [searchURL, setSearchURL] = useState("")

  useEffect(() => {
    const buildURLString = async () => {
      console.log("FindServicesButton, useEffect triggered to build the URL!")
      // example URL = https://www.google.com/maps/search/?api=1&query=service+provider+roof+inspect+Calgary+AB
      let URL = "https://www.google.com/maps/search/?api=1&query=service+provider"
      let urlSearchString = ""
      let urlCity = ""
      let urlCountry = ""
      let urlProvince = ""
      let urlItem = ""
      let urlTask = ""
      // let urlCity = 'Sherwood Park'
      // let urlCountry = 'Canada'
      // let urlProvince = ''
      // let urlItem = 'roof'
      // let urlTask = 'inspect/fix-roof'

      let taskRes
      let taskResObj
      let homeRes
      let homeResObj

      // Retrieve TASK details
      try {
        taskRes = await fetch(`/api/calendarEntry/get/${taskId}`)
        taskResObj = await taskRes.json()
      }
      catch (err) {
        console.log("FindServicesButton says, There was an error retrieving TASK details! Error = ", err)
      }

      // Retrieve HOME information
      if (taskResObj) {
        urlItem = taskResObj.item
        urlTask = taskResObj.task
        try {
          homeRes = await fetch(`/api/home/get/${taskResObj.homeId}`)
          homeResObj = await homeRes.json()
          if (homeResObj) {
            urlCity = homeResObj.city
            urlCountry = homeResObj.country
            urlProvince = homeResObj.province
          }
        }
        catch (err) {
          console.log("FindServicesButton says, There was an error retrieving HOME details! Error = ", err)
        }
      }

      // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // Construct and launch the final URL

      // If related HOME home was found...
      if (urlCity > '') urlSearchString = urlSearchString + '+' + urlCity
      if (urlCountry > '') urlSearchString = urlSearchString + '+' + urlCountry
      if (urlProvince > '') urlSearchString = urlSearchString + '+' + urlProvince

      // If TASK was found... fill out the rest of the URL with its ITEM and TASK info
      if (urlItem > '') urlSearchString = urlSearchString + '+' + urlItem
      if (urlTask > '') urlSearchString = urlSearchString + '+' + urlTask

      // Scrub entire URL to replace special characters with proper url formatting for 'space'
      urlSearchString = urlSearchString.replace(' ', '+')
      urlSearchString = urlSearchString.replace('-', '+')
      urlSearchString = urlSearchString.replace('/', '+')
      urlSearchString = urlSearchString.replace('&', '+')

      // Append the remainder of the search string onto the static portion of the URL
      URL = URL + urlSearchString

      setSearchURL(URL)
    }

    buildURLString()

  })

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <Button
      inline
      // margin="1em 0 0 0"
      // type='button'
      // onClick={() => window.open(URL)}
      // onClick={() => searchGoogleMaps()}
      onClick={() => {
        if (searchURL > "") {
          window.open(`${searchURL}`)
        }
      }}
    >
      Find Local Services
    </Button>
  )

}

export default FindServicesButton