const { Router } = require('express');
const postRouter = Router();

const { updatePost, deletePost, getUserPosts } = require('../controllers/postController');

postRouter.get('/', getUserPosts)
postRouter.put('/:postId', updatePost);
postRouter.delete('/:postId', deletePost);

module.exports = postRouter;