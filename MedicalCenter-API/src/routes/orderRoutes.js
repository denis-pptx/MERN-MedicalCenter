const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, orderController.get);
router.get('/:id', authMiddleware, orderController.getById);
router.post('/', orderController.create);
router.put('/:id', authMiddleware, orderController.update);
router.delete('/:id', authMiddleware, orderController.delete);

module.exports = router;