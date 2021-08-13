require('./EmailService')
const SibApiV3Sdk = require('sib-api-v3-sdk')

// Define functions

const addContact = async (data) => {
  let apiInstance = new SibApiV3Sdk.ContactsApi()
  let createContactInfo = new SibApiV3Sdk.CreateContact(); // CreateContact | Values to create a contact 

  // Define structure and parameters for call to SiB API
  createContactInfo = {
    email: `${data.email}`,
    attributes: {
      FIRSTNAME: `${data.firstName}`,
      LASTNAME: `${data.lastName}`
    }
  }
  // Trigger API for to send email via SendInBlue
  console.log("Contact to be added in SiB = ", createContactInfo)
  let sibRes = await apiInstance.createContact(JSON.stringify(createContactInfo))  // Send email via SiB API
  console.log("Response from SendInBlue = ", sibRes)

  // apiInstance.createContact(createContactInfo).then(function(resData) {
  //   console.log('API called successfully. Returned data: ' + resData);
  // }, function(error) {
  //   console.error(error);
  // });
}

const deleteContact = async (data) => {
  let apiInstance = new SibApiV3Sdk.ContactsApi()
  // let createContactInfo = new SibApiV3Sdk.CreateContact(); // CreateContact | Values to create a contact 

  // Define structure and parameters for call to SiB API
  let identifier = data.email
  
  // Trigger API for to send email via SendInBlue
  console.log("Contact to be deleted in SiB = ", identifier)
  // let sibRes = await apiInstance.deleteContact(JSON.stringify(identifier))  // Send email via SiB API
  let sibRes = await apiInstance.deleteContact(identifier)  // Send email via SiB API
  console.log("Response from SendInBlue = ", sibRes)
  
  // apiInstance.deleteContact(identifier).then(function() {
  //   console.log('API called successfully.');
  // }, function(error) {
  //   console.error(error);
  // });
}


module.exports = {
  addContact,
  deleteContact
}