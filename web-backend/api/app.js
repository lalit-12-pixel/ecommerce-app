const express = require("express");
const path = require("path");
const User = require("./models/User");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");

const { default: mongoose } = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");

const postRouter = require("./router/postsrouter");
const errorsController = require("./controller/error");
const authrouter = require("./router/authrouter");
const addressRouter = require("./router/addressRouter");

const app = express();

// ✅ Trust proxy (needed for sessions + HTTPS behind Nginx)
app.set("trust proxy", 1);

// ✅ CORS for your domains
app.use(
  cors({
    origin: [
      "https://inovative-hub.com",
      "https://www.innovative-hub.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static file serving
app.use("/uploads", express.static("uploads"));

// ✅ Session store in MongoDB
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
    },
  })
);

// ✅ Passport for Google login
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use(authrouter);

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

app.use(postRouter);
app.use(addressRouter);

// ✅ Error handling
app.use(errorsController.pageNotFound);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server directly here
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
