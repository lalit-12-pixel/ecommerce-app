const express = require("express");
const path = require("path");
const User = require("../models/User");

//for google login
const passport = require("passport");
require("dotenv").config();
require("../config/passport");
//

const { default: mongoose } = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");

const postRouter = require("../router/postsrouter");
const errorsController = require("../controller/error");
const authrouter = require("../router/authrouter");
const addressRouter = require("../router/addressRouter");

const DB_PATH =
  "mongodb+srv://innovativehubofficial:Innopassword2025@innovative-hub.69vlvp3.mongodb.net/?retryWrites=true&w=majority&appName=innovativehub";

const app = express();

app.use(
  cors({
    origin: [
      "https://ecommerce-app-qcne.vercel.app",  
      "https://www.inovative-hub.com/"           
    ],
    credentials: true,
  })
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    },
  })
);

//for google login
app.use(passport.initialize());
app.use(passport.session());

app.use(authrouter);

app.get("/", async (req, res) => {
  if (!req.session?.isLoggedIn || !req.session?.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const freshUser = await User.findById(req.session.user._id).lean();

    if (!freshUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user: freshUser });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

app.use(postRouter);
app.use(addressRouter);

app.use(errorsController.pageNotFound);


mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log(" Connected to MongoDB");
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });
module.exports = app;

