const User = require("../models/User");

// ✅ Get all addresses of logged-in user
exports.getAddresses = async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ error: "Not logged in" });

    const user = await User.findById(req.session.user._id);
    res.json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Add new address
exports.addAddress = async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ error: "Not logged in" });

    const user = await User.findById(req.session.user._id);
    const newAddress = req.body;

    if (user.addresses.length === 0) {
      newAddress.isDefault = true;
    }

    user.addresses.push(newAddress);
    await user.save();

    res.json({ message: "Address added", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update address
exports.updateAddress = async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ error: "Not logged in" });

    const { addressId } = req.params;
    const updates = req.body;

    const user = await User.findById(req.session.user._id);
    const address = user.addresses.id(addressId);

    if (!address) return res.status(404).json({ error: "Address not found" });

    Object.assign(address, updates);
    await user.save();

    res.json({ message: "Address updated", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete address
exports.deleteAddress = async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ error: "Not logged in" });

    const { addressId } = req.params;
    const user = await User.findById(req.session.user._id);

    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== addressId
    );

    // If default was deleted → set first as default
    if (
      !user.addresses.some((addr) => addr.isDefault) &&
      user.addresses.length > 0
    ) {
      user.addresses[0].isDefault = true;
    }

    await user.save();
    res.json({ message: "Address deleted", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Set default address
exports.setDefaultAddress = async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ error: "Not logged in" });

    const { addressId } = req.params;
    const user = await User.findById(req.session.user._id);

    let found = false;
    user.addresses.forEach((addr) => {
      if (addr._id.toString() === addressId) {
        addr.isDefault = true;
        found = true;
      } else {
        addr.isDefault = false;
      }
    });

    if (!found) return res.status(404).json({ error: "Address not found" });

    await user.save();
    res.json({ message: "Default address updated", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
