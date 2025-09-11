const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const fs = require("fs");
const https = require("https");

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

// ✅ Trust proxy (for sessions + HTTPS behind Nginx/Proxy)
app.set("trust proxy", 1);

// ✅ CORS setup (allow frontend origins)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Dev
      "https://inovative-hub.com", // Production
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

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());

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

// ✅ Error handler
app.use(errorsController.pageNotFound);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 3001;

    if (process.env.NODE_ENV === "production") {
      // Load SSL certs from .env paths
      const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, "utf8");
      const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, "utf8");

      const credentials = { key: privateKey, cert: certificate };

      https.createServer(credentials, app).listen(PORT, () => {
        console.log(`🚀 HTTPS server running at https://${process.env.DOMAIN}:${PORT}`);
      });
    } else {
      app.listen(PORT, () => {
        console.log(`🚀 Dev server running at http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
