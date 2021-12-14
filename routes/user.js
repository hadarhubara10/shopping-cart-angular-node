var express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  getToken,
  // updateUser,
  // deleteUser,
} = require('../controllers/user');

router.get('/', getAllUsers);
// router.get('/cart', getCart);
router.get('/:userID', getUser);
router.post('/', createUser);
router.post('/idToken', getToken);
// router.patch('/:userID', updateUser);
// router.delete('/:userID', deleteUser);

module.exports = router;
