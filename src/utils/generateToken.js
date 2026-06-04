const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateToken = (userId) => {
  return jwt.sign(
   {
  id: user.id,
  role: user.role
},
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateToken;