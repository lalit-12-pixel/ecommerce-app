const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const paymentRoutes = require('./router/payment');

require("dotenv").config();
require("./config/passport");

// Models
const User = require("./models/User");

// Routers & Controllers
const postRouter = require("./router/postsrouter");
const errorsController = require("./controller/error");
const authrouter = require("./router/authrouter");
const addressRouter = require("./router/addressRouter");

const app = express();

// ✅ Trust proxy (needed for secure cookies behind Nginx/Proxy)
app.set("trust proxy", 1);

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://inovative-hub.com",
      "https://www.inovative-hub.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ MongoDB Session Store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

// ✅ Session config with dynamic secure cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ✅ only secure in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ required if frontend is on a different domain
    },
  })
);


// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Health check
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});



// ✅ Routes
app.use(authrouter);
app.use(postRouter);
app.use(addressRouter);


// ✅ Root check
app.get("/", async (req, res) => {
  if (!req.session?.isLoggedIn || !req.session?.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const freshUser = await User.findById(req.session.user._id).lean();
    if (!freshUser) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ user: freshUser });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});


// app.use("/api/payment", paymentRoutes);

// ✅ Error handler
app.use(errorsController.pageNotFound);

// ✅ MongoDB connection and start server
const PORT = 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });