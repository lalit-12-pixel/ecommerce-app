const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Product = require("../models/Product");


exports.signup = [
  check("name").trim().isLength({ min: 2 }).withMessage("Name too short"),
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail()
    .custom(async (value) => {
      const existing = await User.findOne({ email: value });
      if (existing) throw new Error("Email already registered");
    }),
  check("password")
    .isLength({ min: 8 }).withMessage("Min 8 characters")
    .matches(/[A-Z]/).withMessage("At least one uppercase letter")
    .matches(/[a-z]/).withMessage("At least one lowercase letter")
    .matches(/[0-9]/).withMessage("At least one number")
    .matches(/[!@&,.]/).withMessage("At least one special character"),
  check("confirmPassword").custom((val, { req }) => {
    if (val !== req.body.password) throw new Error("Passwords do not match");
    return true;
  }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ success: false, errors: errors.array() });

    const { name, email, password, username } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ name, email, password: hashedPassword, username });
      await user.save();

      req.session.isLoggedIn = true;
      req.session.user = {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      };

      res.status(201).json({
        success: true,
        message: "Signup successful",
        user: req.session.user,
      });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ success: false, errors: [{ msg: err.message }] });
    }
  },
];

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(422).json({ success: false, errors: ["User not found"] });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(422).json({ success: false, errors: ["Invalid password"] });

    req.session.isLoggedIn = true;
    req.session.user = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    res.json({ success: true, message: "Login successful", user: req.session.user });
  } catch (err) {
    res.status(500).json({ success: false, errors: ["Server error"] });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false, error: "Logout failed" });
    res.json({ success: true, message: "Logged out successfully" });
  });
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // fetch all products from MongoDB
    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch products",
    });
  }
};
