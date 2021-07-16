require('./EmailService')
const SibApiV3Sdk = require('sib-api-v3-sdk')

const { Tester, listAllTesters, findTesterByEmail } = require('./Tester')
const { CalendarEntry } = require('./CalendarEntry')

// Define functions

const sendUserEmail = async (data) => {
  
  let messageType = data.type
  let templateId = 0  // This is the desired SendInBlue email TEMPLATE to be used.
  
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
  let sendTestEmail = new SibApiV3Sdk.SendTestEmail(); // SendTestEmail | 
  sendTestEmail.emailTo = [data.email]
  let targetRecipient = data.email
  let currentDate = new Date() 
  
  try {

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // FOR TESTING ONLY: (remove or disable this block of code if in PRODUCTION)
    // For single-user email, look up all emails listed in the DB 'testers'
    // collection, and see if the email address provided is valid. If it is
    // NOT a valid email, override it by defaulting to the SiB account owner.
    let lookupResult = await findTesterByEmail(data.email)
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
            let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // Use Send Transactional Email method
            let arrayIndexer = 0
            let currentItem = {}

            // Retrieve data required for body of email

            // First retrieve OVERDUE tasks.
            // Retrieve data from DB
            let dbOverdueResponse = await CalendarEntry.find({ userid: data.userid, completed: false, date: { $lt: currentDate.toISOString() }  }, null, {sort: {date: 1}})

            let userOverdueTaskList = [{}]
            if (dbOverdueResponse.length > 0) {
              arrayIndexer = 0
              while (arrayIndexer < dbOverdueResponse.length) {
                currentItem = dbOverdueResponse[arrayIndexer]
                userOverdueTaskList[arrayIndexer] = {
                  status: "overdue",
                  date: currentItem.date,
                  house: currentItem.house,
                  item: currentItem.item,
                  task: currentItem.task
                }                
                arrayIndexer += 1
              } 
            }

            // Next retrieve all UPCOMING tasks in next 2 weeks.
            let dateToday = new Date()  // start with current date
            let targetDate = dateToday.setDate(dateToday.getDate() + 14)  // add 14 days to current day
            // convert target date into a new date, and convert it to an ISO date-time string
            targetDate = new Date(targetDate).toISOString()
            
            // Retrieve data from DB
            let dbResponse = await CalendarEntry.find({ userid: data.userid, date: { $gte: currentDate.toISOString(), $lte: targetDate }, completed: false }, null, {sort: {date: 1}})
            
            let userTaskList = [{}]
            if (dbResponse.length > 0) {
              arrayIndexer = 0
              while (arrayIndexer < dbResponse.length) {
                currentItem = dbResponse[arrayIndexer]
                userTaskList[arrayIndexer] = {
                  status: "active",
                  date: currentItem.date,
                  house: currentItem.house,
                  item: currentItem.item,
                  task: currentItem.task
                }
                arrayIndexer += 1
              } 
            }
            
            let combinedTaskList = [{}]
            combinedTaskList = [...userOverdueTaskList, ...userTaskList]
            
            if ((dbResponse.length === 0) && (dbOverdueResponse.length === 0 )) {
              userTaskList = [{
                status: "active",
                date: "None. You have NO TASKS within the next 2 weeks.",
                house: "",
                item: "",
                task: ""
              }]
            }
            
            console.log("userOverdueTaskList = ", userOverdueTaskList )
            console.log("userTaskList = ",userTaskList)
            
            // Define structure and parameters for call to SiB API
            sendSmtpEmail = {
              to: [{
                email: `${targetRecipient}`,
                name: `${data.firstname}`
              }],
              templateId: 3,
              params: {
                name: `${data.firstname}`,
                overduetasks: userOverdueTaskList,
                upcomingtasks: userTaskList

                // "tasklist": [
                //   {"status":"overdue","date":"2021-07-01T06:00:00.000Z","house":"1","item":"Roof","task":"Inspect Shingles"},
                //   {"status":"overdue","date":"2021-07-04T06:00:00.000Z","house":"1","item":"Lawn","task":"Mow yard"}
                // ]
              },
              headers: {
                'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
              }
            }
            // Trigger API for to send email via SendInBlue
            console.log("REMINDER email being sent to:", targetRecipient) 
            await apiInstance.sendTransacEmail(JSON.stringify(sendSmtpEmail))  // Send email via SiB API
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
