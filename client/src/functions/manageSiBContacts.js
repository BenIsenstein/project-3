const addSiBContact = async (email, firstName, lastName) => {
  let action = "/api/sibContact/add"  // Endpoint for adding Contact
  let options = {
    method: 'post',
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      "email": `${email}`,
      "firstName": `${firstName}`,
      "lastName": `${lastName}`
    })
  }
  try {
    let res = await fetch(action, options)
    let resObject = await res.json()
    if (!resObject.success) alert("Your call to the addSiBContact API failed.")
  }
  catch (err) {
    console.log('error calling addSiBContact API: ', err)
    // alert("There was an error calling the addSiBContact API. We're fixing it as fast as we can.")
  }
}

const deleteSiBContact = async (email) => {
  let action = "/api/sibContact/delete"  // Endpoint for adding Contact
  let options = {
    method: 'post',
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      "email": `${email}`
    })
  }
  try {
    let res = await fetch(action, options)
    let resObject = await res.json()
    if (!resObject.success) alert("Your call to the deleteSiBContact API failed.")
  }
  catch (err) {
    console.log('Error calling deleteSiBContact API: ', err)
    // alert("There was an error calling the deleteSiBContact API. We're fixing it as fast as we can.")
  }
}

export { 
  addSiBContact, 
  deleteSiBContact
}