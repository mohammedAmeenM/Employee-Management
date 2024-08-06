const User = require("../models/authSchema");

const getUser = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({
                status: "failure",
                message: "Bad request"
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                status: "failure",
                message: "User Not Found"
            });
        }
        res.status(200).json({
            status: "success",
            message:"successfully fetched user",
            user
        });
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Internal server error",
            error_message: error.message,
        });
    }
}

module.exports = { getUser };
