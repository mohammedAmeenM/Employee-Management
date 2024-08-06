const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      status: "failure",
      message: "No token provided",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(500).json({
        status: "failure",
        message: "Failed to authenticate token",
      });
    }
    req.userId = decode.userId;
    next();
  });
};

module.exports = { verifyToken };
