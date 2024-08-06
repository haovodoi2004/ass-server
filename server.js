const express = require('express');
const bodyParser = require("body-parser");
const Database = require("./config/db");
const app = express();
const router = require('./router/api')
require('dotenv').config()
app.use(express.static('public/'));
app.use(bodyParser.json())
/// Run port dc setup trong file .env hoặc port 3000
PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on localhost port : " + PORT)
})
// ROUTER
app.use('/api', router)
//Connect vào Database
Database.connect()
