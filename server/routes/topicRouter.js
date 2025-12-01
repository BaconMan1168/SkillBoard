const { Router } = require('express');
const topicRouter = Router();

const { getAllTopics, selectTopics, getUserTopics, createTopic } = require('../controllers/topicController');
const { getPostsByTopic, createPost } = require('../controllers/postController');

topicRouter.get('/', getAllTopics);
topicRouter.put('/select', selectTopics);
topicRouter.get('/me', getUserTopics);

topicRouter.get('/:topicId', getPostsByTopic);
topicRouter.post('/:topicId', createPost);
topicRouter.post('/create', createTopic);

module.exports = topicRouter;