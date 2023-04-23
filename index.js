
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid ='some-id'

admin.auth().createCustomToken(uid)
.then((customToken) => {
    console.log(customToken,"token")
    return(customToken)
})
.catch((error)=>{
    console.log('error',error)
})