const mongoose  = require('mongoose')

async function connectDb(){
     try {
      await mongoose.connect("mongodb://localhost:27017/test_full")
          console.log("Databse is connected")
     } catch (error) {
          console.log("err",error)
     }
}
module.exports = connectDb