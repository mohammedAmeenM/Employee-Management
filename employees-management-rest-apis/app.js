const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const employeeRoutes=require('./src/routes/employeeRoutes')

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routesss

app.use('/api/auth/',authRoutes)
app.use('/api/users/',userRoutes)

app.use('/api/employees/',employeeRoutes)


module.exports = app    