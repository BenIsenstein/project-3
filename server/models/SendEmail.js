require('./EmailService')
const SibApiV3Sdk = require('sib-api-v3-sdk');
  
// Define functions
let EmailBody = ""

const sendUserEmail = async (data) => {
    if (data.type === "reminder") {
        console.log("Send REMINDER email to address:", data.email)
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