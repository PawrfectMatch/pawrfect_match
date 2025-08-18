const express = require("express");
const app = express();
require('dotenv').config(); 
const db = require("./config/db")
const cors = require("cors");

//Middleware
app.use(cors());
app.use(express.json());


app.use("/", (req, res) => {
    res.send("Hello World")
})


app.listen(process.env.PORT, () => {
    console.log(`🌐 Server is listening on http://localhost:${process.env.PORT}`);
})

