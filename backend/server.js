const express= require('express');
const dotenv= require('dotenv');
const connectDB=require('./config/db');
const cors= require('cors');
const app=express();
const session= require('express-session');

//Middleware
dotenv.config();
app.use(express.json());
app.use(cors({credentials: true, origin: process.env.APPLICATION_UI}));
app.use('/product_images',express.static('product_images'));
app.set('trust proxy', 1);

app.use(session({
    secret:'yourSecretKey',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:true,
        sameSite: 'none'
    }
}));

connectDB();

app.use('/api/products',require('./routes/adminroutes'));
app.use('/api/user',require('./routes/authroutes'));

const port= process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Server is running on port ${port}`));