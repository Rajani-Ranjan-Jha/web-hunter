const AdminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");

// const bcrypt = require('bcryptjs')
// const JWT_SECRET = "rajani@devil";

async function generateTokenForAdmin(id) {
  const admin = await AdminModel.findById(id);
  const payload = {
    id: admin._id,
    email: admin.email,
    username: admin.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return token;
}

function validateToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}


module.exports = { generateTokenForAdmin, validateToken };
