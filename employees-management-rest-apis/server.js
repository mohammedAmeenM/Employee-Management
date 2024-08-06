const dotenv = require('dotenv');
dotenv.config()
const app= require('./app');
const connectDb = require('./src/db/dbConnection');


connectDb()

app.listen(process.env.PORT,()=>{
    console.log(`Server running port no:${process.env.PORT}`)
})