const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieparser= require('cookie-parser')
// const sendEmail= require('./routes/smtp') //==>form smtp.js

//connect to database
const connectDB = require('./config/connection');
connectDB();

//allow json to parsed
app.use(express.json());
app.use(cookieparser())

//routes
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/driver-register", require("./routes/driver_reg"));
app.use("/api/driver-login", require("./routes/driver_login"));



app.use("/api/logout", require("./routes/logout"));

// sendEmail();//uncomment only if u want to use this function ==>form smtp.js
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});