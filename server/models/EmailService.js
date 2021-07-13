require("dotenv").config()

const SibApiV3Sdk = require('sib-api-v3-sdk');

let defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIBAPIKEY
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKey.apiKeyPrefix['api-key'] = "Token"

// Configure API key authorization: partner-key
let partnerKey = defaultClient.authentications['partner-key'];
partnerKey.apiKey = process.env.SIBAPIKEY
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//partnerKey.apiKeyPrefix['partner-key'] = "Token"

let api = new SibApiV3Sdk.AccountApi()
api.getAccount().then(function(data) {
  console.log('SendInBlue API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});