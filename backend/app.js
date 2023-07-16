const express = require("express")

const cors = require('cors');
const dotenv = require("dotenv").config



const app = express()
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  };

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use("/post",require("./routes/post.routes"))
app.use("/search",require("./routes/search.routes"))





module.exports = app;