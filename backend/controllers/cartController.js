import userModel from '../models/userModel.js';

// Add item to cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.user.id);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.user.id, { cartData });
    res.json({ success: true, message: "Item added to cart successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error while adding item to cart" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.user.id);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.user.id, { cartData });
    res.json({ success: true, message: "Item removed from cart successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error while removing item from cart" });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.user.id);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};
    res.json({ success: true, message: "Cart items fetched successfully", cartData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error while fetching cart items" });
  }
};

export { addToCart, removeFromCart, getCart };
