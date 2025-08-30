const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/authcontroller");
const { passport, syncUserToSession } = require("../config/passport");

// Google OAuth login

// -------------------- GOOGLE LOGIN --------------------

// Step 1: Redirect to Google
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google OAuth callback
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: true, // required for passport to use session
  }),
  syncUserToSession, // sync user to session after successful login
  (req, res) => {
    // Now req.session.user is set
    res.redirect("http://localhost:5173/home");
  }
);
// Logout
authRouter.get("/logout", authController.logout);

// Email/password login
authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);
authRouter.post("/signout", authController.logout);

// Get all products
authRouter.get("/products", authController.getProducts);

module.exports = authRouter;
