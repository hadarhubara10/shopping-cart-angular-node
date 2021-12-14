var express = require('express');
const router = express.Router();
const { getAllProducts, getProduct } = require('../controllers/product');
const {
  addProductToCart,
  getCart,
  updateProduct,
  deleteProduct,
  deleteAllCart,
} = require('../controllers/productCart');

router.get('/', getAllProducts);
router.get('/cart', getCart);
router.get('/:productID', getProduct);
router.post('/:productID', addProductToCart);
router.patch('/:productID', updateProduct);
router.delete('/:productID', deleteProduct);
router.delete('/cart/del', deleteAllCart);

module.exports = router;
