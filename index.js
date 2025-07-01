const express = require("express")
const app = express();
app.use(express.json());
const port  = 3000;

const connectDB = require('./config/db');
const homeRoutes = require('../backend/routes/home');
const signupRoutes = require('./routes/signup')
const loginRoutes = require('./routes/login')
connectDB();

app.use('/',homeRoutes);
app.use('/signup',signupRoutes);
app.use('/login',loginRoutes);


app.listen(port,()=>{
    console.log(`app is listneing on port ${port}`);
})