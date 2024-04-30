# What is Mongoose?

A Object-Document Mapping Library

# Core Concept

Schemas & Models  -------  User, Product


Instances  -------------- const user = new User();


Queries    -------------- User.find()


# https://mongoosejs.com/docs/

- npm i mongoose

# connecting database with mongoose

# Creating the product schema

mongoose provide couple of static method - docs
# Saving Data Through Mongoose
.save()

# Fetching All Products
.find()

# Fetching a Single Product
we can pass productId as string, and mongoose will convert it in ObjectId() automatic
.findById(productId)

# Updating Products
Product.findById(prodId)
  .then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    
    return product.save()
  })
  .then(result => {
    console.log('UPDATED PRODUCT!');
    res.redirect('/admin/products');
  })

# Deleting Products

# Adding and Using a User Model

# Using Relations in Mongoose
- Every product should be assign to a user
userId: {
  type: Schema.Types.ObjectId,
  ref: 'User', // refer to the User model    ref: 'modelName'
  required: true
}

and if you save whole object with key 'userId', it only save the ObjectId, not the whole obj, for the convenient

# One Important Thing About Fetching Relations
- like if we want the object

exports.getProducts = (req, res, next) => {
  Product.find()
    // you could also select and exclude a specific field, for main document
    .select('title price -_id')

    // for related document
    // path to the key which you want to populate the whole obj, it could be like that, userId.anotherId.id
    // and the second param define which key you only want to populate like just name
    // if you don't pass anything it retrieve the whole object
    // for excluding like _id

    .populate('userId', 'name -_id')

    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

# Working on the Shopping Cart
- you can add your own methods in the Model, in schema, Instance Method
- https://mongoosejs.com/docs/guide.html#methods

# Loading the Cart
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


# Deleting Cart Items

# Creating & Getting Orders

# Getting & Displaying the Orders

