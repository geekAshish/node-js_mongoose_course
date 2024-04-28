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

# 
