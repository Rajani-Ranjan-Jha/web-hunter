const AdminModel = require("../models/adminModel");
const {generateTokenForAdmin} = require('../utils/auth')


const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(401)
        .json({ message: "email and password field is required!!" });
    const admin = await AdminModel.findOne({ email });

    if (!admin)
      return res
        .status(401)
        .json({ message: `No user exists with email: ${email}!!` });

    if (admin.password !== password)
      return res.status(401).json({ message: "Invalid password!!" });

    // Generate JWT token
    const token = await generateTokenForAdmin(admin._id);
    // console.log(`token successfully generated (authController): ${token}`)


    res.cookie("LoginToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    

    return res.status(200).json({ 
      message: "you have logged in successfully ✅✅",
      isAdmin: true,
      user: {
        id: admin._id,
        email: admin.email,
        username: admin.username
      }
    });

  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

// Add logoutAdmin function to clear the cookie
const logoutAdmin = (req, res) => {
  console.log('got a logout request')
  try {
    res.clearCookie("LoginToken",{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });
    return res.status(200).json({ message: "Logout successful ✔️✔️" });
  } catch (error) {
    console.log(`error during logout (authcontroller)`, error)
    return res.status(501).json({ message: "Logout unsuccessful ❌❌" });
  }
  
};


module.exports = {
  loginAdmin,
  logoutAdmin,
};
