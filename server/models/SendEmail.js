require('./EmailService')
const SibApiV3Sdk = require('sib-api-v3-sdk')

const { Tester, listAllTesters, findTesterByEmail } = require('./Tester')
const { CalendarEntry } = require('./CalendarEntry')

// Define functions

const sendUserEmail = async (data) => {

  console.log("sendUserEmail model: data.email = ", data.email)
  let messageType = data.type
  let templateId = 0  // This is the desired SendInBlue email TEMPLATE to be used.

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
  let sendTestEmail = new SibApiV3Sdk.SendTestEmail(); // SendTestEmail | 
  sendTestEmail.emailTo = [data.email]
  let targetRecipient = data.email

  try {

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // FOR TESTING ONLY: (remove or disable this block of code if in PRODUCTION)
    // For single-user email, look up all emails listed in the DB 'testers'
    // collection, and see if the email address provided is valid. If it is
    // NOT a valid email, override it by defaulting to the SiB account owner.
    let lookupResult = await findTesterByEmail(data.email)
    console.log("sendUserEmail model: tester email lookup result = ", lookupResult)
    if (lookupResult && lookupResult > "") {
      console.log("sendUserEmail model: Found TESTER!")
      targetRecipient = data.email
    }
    else {  // default to account owner
      targetRecipient = "artt@shaw.ca"
    } 
    sendTestEmail.emailTo = [targetRecipient]
    // End of code block intended strictly for TESTING
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

    if (sendTestEmail.emailTo !== []) {
      switch (messageType) {
        case "reminder":
          {
            // Define parameters for email API
            apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
            let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendTestEmail
            templateId = 2
            // sendSmtpEmail.emailTo = [targetRecipient]

            // Retrieve data required for body of email
            let targetDate = new Date()  // start with current date
            let daysRange = 14  // date range from current day
            targetDate = targetDate.setDate(targetDate.getDate() + daysRange)
            console.log("Target end date for date range is:", targetDate)
            let userTaskList = await CalendarEntry.find({ userid: data.userid, date: { $lte: "2021-07-18T06:00:00.000Z" }}, null, {sort: {date: 1}})
            // let userTaskList = await CalendarEntry.find({ userid: data.userid, date: { $lte: targetDate }, completed: false }, null, {sort: {date: 1}})
            console.log("User task list = ", userTaskList)
            let formattedList = "List of Tasks goes HERE!"
            
            sendSmtpEmail = {
              to: [{
                email: `${targetRecipient}`,
                name: `${data.firstname}`
              }],
              templateId: 2,
              params: {
                name: `${data.firstname}`,
                body: `${formattedList}`
              },
              headers: {
                'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
              }
            }

            // Trigger API for to send email via SendInBlue
            console.log("REMINDER email being sent to:", targetRecipient) 
            await apiInstance.sendTransacEmail(sendSmtpEmail)
          }
          break;
        case "welcome":
          templateId = 2
          break;
        case "overdue":
          templateId = 1
          break;
        case "test": {
          // Define parameters for email API
          apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
          sendTestEmail = new SibApiV3Sdk.SendTestEmail(); // SendTestEmail
          templateId = 1
          sendTestEmail.emailTo = [targetRecipient]
          // Trigger API for to send email via SendInBlue
          console.log("TEST email being sent to:", sendTestEmail.emailTo) 
          await apiInstance.sendTestTemplate(templateId, sendTestEmail)
        }
          break;
        default:
          console.log("No email sent because message TYPE was not provided.")
      }
    }
  }
  catch (err) {
    console.log("Error calling API to send email:", err)
  }

  // if ((templateId !== 0) && (sendTestEmail.emailTo !== "")) {
  //   try {
  //     console.log("This is where the SiB api gets called.")
  //     console.log("templateId = ",templateId)
  //     console.log("sendTestEmail = ",sendTestEmail)
  //     let apiCallResult = await apiInstance.sendTestTemplate(templateId, sendTestEmail)
  //     console.log("apiCallResult = ", apiCallResult)
  //   }
  //   catch (err) {
  //     console.log("Error calling API to send email:", err)
  //   }
  // }

  // if (data.type === "reminder") {
  //     console.log("Send REMINDER email to address:", data.email)

  //     // Define structure for API call
  //     var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  //     var templateId = 1; // Number | Id of the template
  //     var sendTestEmail = new SibApiV3Sdk.SendTestEmail(); // SendTestEmail | 
  //     // sendTestEmail.emailTo = [data.email]
  //     sendTestEmail.emailTo = "artt@shaw.ca"

  //     // Call the API
  //     apiInstance.sendTestTemplate(templateId, sendTestEmail)
  // }

}

const sendGroupEmail = async () => { }

module.exports = {
  sendUserEmail,
  sendGroupEmail
}
