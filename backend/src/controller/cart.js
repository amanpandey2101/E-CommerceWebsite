const Cart = require('../models/cart');

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec().then((cart) => {
    if (cart) {
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find(c => c.product === product);

      if (item) {
        Cart.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product },
          { "$set": { "cartItems.$": {
             ...req.body.cartItems, quantity: item.quantity + req.body.cartItems.quantity 
            }}},
          { new: true }
        ).exec().then((_cart) => {
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        }).catch((error) => {
          return res.status(400).json({ error });
        });
      } else {
        Cart.findOneAndUpdate(
          { user: req.user._id },
          { "$push": { "cartItems": req.body.cartItems } },
          { new: true }
        ).exec().then((_cart) => {
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        }).catch((error) => {
          return res.status(400).json({ error });
        });
      }
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems]
      });

      cart.save().then((_cart) => {
        if (_cart) {
          return res.status(201).json({ cart: _cart });
        }
      }).catch((error) => {
        return res.status(400).json({ error });
      });
    }
  }).catch((error) => {
    return res.status(400).json({ error });
  });
};
