require('./EmailService')
const SibApiV3Sdk = require('sib-api-v3-sdk');
  
// Define functions
let EmailBody = ""


const sendUserEmail = async (data) => {
    if (data.type === "reminder") {
        console.log("Send REMINDER email to address:", data.email)

        // Define structure for API call
        var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        var templateId = 1; // Number | Id of the template
        var sendTestEmail = new SibApiV3Sdk.SendTestEmail(); // SendTestEmail | 
        sendTestEmail.emailTo = [data.email]

        // Call the API
        apiInstance.sendTestTemplate(templateId, sendTestEmail)
    }
    else if (data.type === "welcome") {
        console.log("Send WELCOME email to address:", data.email)
    }
}

const sendGroupEmail = async () => {}

module.exports = {
    EmailBody,
    sendUserEmail,
    sendGroupEmail
}

