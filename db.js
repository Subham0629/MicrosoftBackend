const mongoose=require("mongoose")
require('dotenv').config()
const connection=mongoose.connect(process.env.mongoURL)


module.exports={
    connection
}
// {
//     "name": "Rajat",
//     "email": "rajat@gmail.com",
//     "pass": "rajat@123",
//     "age": 26
//   }
// {
//     "title":"Learn Full Stack",
//     "body":"First time learning",
//     "category":"FS"
// }

// {
//     "email":"subham@gmail.com",
//     "pass":"subham@123"
// }