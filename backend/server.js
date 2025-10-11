const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo");

dotenv.config();
const app = express();

connectDB();

// Middleware
app.use(express.json());

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/api/user", require("./routes/authroutes"));
app.use("/api/products", require("./routes/adminroutes"));

const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "frontend", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname1, "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));