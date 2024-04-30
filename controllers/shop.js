const Order = require('../models/order');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  // to get all products
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')// populate doesn't return a promise, so we'll get an error
    .execPopulate() // to not get error, we'll use execPopulate, which will return a promise
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // findById is mongoose method
  Product.findById(prodId)
    .then(product => {
      // addToCart, we created it in the user model
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')// populate doesn't return a promise, so we'll get an error
    .execPopulate() // to not get error, we'll use execPopulate, which will return a promise
    .then(user => {
      const products = user.cart.items?.map((item) => {
        return {
          quantity: item.quantity,
          // product: item.productId, // it'll only save the ObjectId()
          product: {...item.productId._doc } // _doc is provided by mongoose to only save the object data
        }
      })

      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user, // mongoose will automatic picks only ObjectId()
        },
        products: products,
      });

      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  // finding the order data for the logged in user
  Order
    .find({'user.userId': req.user._Id})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
