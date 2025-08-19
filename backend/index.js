const express = require("express");
const app = express();
require('dotenv').config(); 
const db = require("./config/db")
const cors = require("cors");
const usersRouter = require("./routes/usersRoutes");
const authRouter = require("./routes/authRoutes");

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.use("/", (req, res) => {
    res.send("Hello World")
})


app.listen(process.env.PORT, () => {
    console.log(`🌐 Server is listening on http://localhost:${process.env.PORT}`);
})

