const { Router } = require('express')
const authRouter = Router();
const { registerUser, loginUser } = require('../controllers/authController');

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

module.exports = authRouter;

