const mongoose = require('mongoose');
// const product = require('../models/product');
const Product = require('../models/product');
// const Category = require('../models/category');
module.exports = {
  getAllProducts: (req, res) => {
    Product.find()
      // .populate('categoryID', 'title')
      .then((products) => {
        res.status(200).json({ products });
      })
      .catch((err) =>
        res.status(500).json({
          error,
        })
      );
  },
  getProduct: (req, res) => {
    const productID = req.params.productID;
    Product.findById(productID)
      .then((product) => {
        console.log(product);
        res.status(200).json({ product });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  },
};
