const express = require("express")
const app = express();
app.use(express.json());
const port  = 4000;
const cors = require('cors');

const connectDB = require('./config/db');
connectDB();

app.use(cors());


const homeRoutes = require('../backend/routes/home');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const serviceRoutes = require('./routes/foods');
const orderRoutes = require('./routes/orders');


app.use('/',homeRoutes);
app.use('/signup',signupRoutes);
app.use('/login',loginRoutes);
app.use('/services', serviceRoutes);
app.use('/orders',orderRoutes);


app.listen(port,()=>{
    console.log(`app is listneing on port ${port}`);
});