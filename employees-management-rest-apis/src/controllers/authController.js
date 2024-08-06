const bcrypt = require('bcrypt')
const User = require("../models/authSchema");
const { generateToken } = require('../utils/generateToken');


const registerUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data.password) {
        return res.status(400).json({
          status: "failure",
          message: "Password is required",
        });
      }
    const hashedPassword = await bcrypt.hash(data.password,10)
      
    const user = new User({ ...data,password:hashedPassword });
    if (!user) {
      return res.status(400).json({
        status: "failure",
        message: "Somthing went wrong",
      });
    }
    await user.save();
   
    res.status(201).json({
      status: "success",
      message: "Successfully created user",
      user
    
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error_message: error.message,
    });
  }
};

const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(404).json({
                status:'failure',
                message:'User not found'
            })
        };
        const findPassword = await bcrypt.compare(password, user.password);
        
        if(!findPassword){
            return res.status(400).json({
                 status:'failure',
                 message:'invalied password'
            })
        };
       const token = generateToken(user._id)
        res.status(200).json({
            status:'success',
            message:'Login successfully',
            user,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Internal server error",
            error_message: error.message,
          });
    }
}

module.exports = {registerUser,loginUser}