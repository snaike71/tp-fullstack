const http = require('http');
const connectDB = require('./config/db');
const app = require('./app');
const PORT  = 8081
require('dotenv').config();
connectDB()


const server = http.createServer(app);

server.listen(PORT,()=>{
  console.log("serveur open on port" + PORT)
})
