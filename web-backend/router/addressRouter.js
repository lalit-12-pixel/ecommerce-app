const express = require("express");
const router = express.Router();
const {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controller/addressController");

// GET all addresses
router.get("/api/addresses", getAddresses);

// POST add new address
router.post("/api/addresses", addAddress);

// PUT update existing address
router.put("/api/addresses/:addressId", updateAddress);

// DELETE address by id
router.delete("/api/addresses/:addressId", deleteAddress);

// PUT set default address
router.put("/api/addresses/default/:addressId", setDefaultAddress);

module.exports = router;
