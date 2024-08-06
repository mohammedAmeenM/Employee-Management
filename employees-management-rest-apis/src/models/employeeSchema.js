const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    }
},
{
    timestamps: true
})

const Employee = mongoose.model("Employee",employeeSchema)
module.exports = Employee