const express= require('express');
const dotenv= require('dotenv');
const connectDB=require('./config/db');
const cors= require('cors');
const app=express();
const session= require('express-session');
const MongoStore = require('connect-mongo');

//Middleware
dotenv.config();
app.use(express.json());
app.use(cors({
    credentials: true, 
    origin: process.env.APPLICATION_UI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));
app.use('/product_images',express.static('product_images'));
app.set('trust proxy', 1);

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: 'sessions',
        ttl: 86400
    }),
    cookie: {
        httpOnly: true,   
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

app.use((req, res, next) => {
  console.log("Incoming request cookies:", req.headers.cookie);
  console.log("Session data:", req.session);
  next();
});

connectDB();

app.use('/api/products',require('./routes/adminroutes'));
app.use('/api/user',require('./routes/authroutes'));

const port= process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Server is running on port ${port}`));