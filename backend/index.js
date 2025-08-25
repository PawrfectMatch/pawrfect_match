const express = require("express");
const app = express();
require('dotenv').config(); 
const db = require("./config/db")
const cors = require("cors");
const cookieParser = require('cookie-parser')

const usersRouter = require("./routes/usersRoutes");
const authRouter = require("./routes/authRoutes");
const petRoutes = require('./routes/petRoutes')


//Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true}));
app.use(express.json());
app.use(cookieParser())


//Routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use('/api/pets', petRoutes)

app.use("/", (req, res) => {
    res.send("Hello World")
})


app.listen(process.env.PORT, () => {
    console.log(`🌐 Server is listening on http://localhost:${process.env.PORT}`);
})

