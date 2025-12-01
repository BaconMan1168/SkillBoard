const { Router } = require('express');
const userRouter = Router();

const { getProfile } = require('../controllers/userController');

userRouter.get('/', getProfile);

module.exports = userRouter;