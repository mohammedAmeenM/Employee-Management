const mongoose = require('mongoose');


const connectDb =async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL,{dbName:'employee-management'})
        console.log('Db connected sucessfully')
    } catch (error) {
        console.log('error coonecting db',error)
    }
}
module.exports = connectDb;