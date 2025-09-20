const express = require("express");
const cookieParser = require("cookie-parser"); //cookie parser
const cors = require("cors");
const webRoutes = require("./routes/webRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const { checkForToken } = require("./middlewares/auth.js");
const {GetDataUsingURL} = require('./utils/Cheerio.js')

const CLIENT_URL = process.env.CLIENT_URL;

// Initialize express app
const app = express();
const PORT = 3000;




app.use(cors({
  origin: [
    `${CLIENT_URL}`
  ],
  credentials: true
}));


//connect to database
connectDB();

// installed MIDDLEWAREs
dotenv.config();
app.use(express.json());
app.use(cookieParser());



// CUSTOM middleware
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Web Hunter API",
    status: "active",
  });
})

app.use("/api", checkForToken, webRoutes);
app.use("/admin", checkForToken, authRoutes);

// routes
app.post("/authorize-admin", checkForToken, (req, res) => {
  if (req.admin) {
    res.json({
      message: "Current User is a Admin",
      isAdmin: true,
    });
  } else {
    res.json({
      message: "Current User is NOT a Admin",
      isAdmin: false,
    });
  }
});

app.post('/generate', async (req,res) =>{
  const {url} = req.body
  const result = await GetDataUsingURL(url)
  console.log(result)
  res.json(result)
});



app.listen(PORT, () => {
  console.log(`Server is active at ${PORT}`);
});
