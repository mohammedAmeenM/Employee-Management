const express = require('express')
const userController = require('../controllers/userController')
const userRoutes= express.Router();
const {verifyToken} =require('../middlewares/verifyToken')

userRoutes.get('/',verifyToken,userController.getUser)

module.exports = userRoutes;