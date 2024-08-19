const express = require('express');
const userController = require('../controllers/user-controller');
const AuthMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

router.get('/', userController.get);
router.post('/', userController.register);
router.get('/:id', userController.getOne);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;
