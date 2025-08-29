const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/authcontroller");
const passport = require("passport");

// Google OAuth login
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: true,
  }),
  (req, res) => {
    req.session.regenerate((err) => {
      if (err) return res.redirect("http://localhost:5173/login");

      req.session.user = req.user;
      req.session.isLoggedIn = true;

      req.session.save((err) => {
        if (err) return res.redirect("http://localhost:5173/login");

        res.redirect("http://localhost:5173/home");
      });
    });
  }
);

// Logout
authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("http://localhost:5173");
    });
  });
});

// Auth routes
authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);
authRouter.post("/signout", authController.logout);
// Products route
authRouter.get("/products", authController.getProducts);


module.exports = authRouter;
