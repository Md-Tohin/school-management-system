const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookeParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(cookeParser());

app.get("/test", (req, res) => {
    res.send({id: 1, message: "Hello Bangladesh"})
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is running at port :",PORT);
})

