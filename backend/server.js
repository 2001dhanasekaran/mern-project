const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();

const app = express();

app.set('trust proxy', 1);

app.use(express.json());

app.use(cors({
  origin: process.env.APPLICATION_UI,
  credentials: true
}));

// Session
app.use(session({
  name: "connect.sid",
  secret: process.env.SESSION_SECRET,
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
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use((req, res, next) => {
  console.log("Incoming cookies:", req.headers.cookie);
  console.log("Session:", req.session);
  next();
});

app.use('/product_images', express.static('product_images'));

connectDB();

// Routes
app.use('/api/products', require('./routes/adminroutes'));
app.use('/api/user', require('./routes/authroutes'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
