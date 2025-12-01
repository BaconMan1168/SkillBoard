const { Router } = require('express');
const { createComment } = require('../controllers/commentController');
const commentRouter = Router();

commentRouter.post('/:postId', createComment);

module.exports = commentRouter;