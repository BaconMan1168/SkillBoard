const { Router } = require('express');
const topicRouter = Router();

const { getAllTopics, selectTopics, getUserTopics, createTopic } = require('../controllers/topicController');
const { getPostsByTopic, createPost } = require('../controllers/postController');

topicRouter.get('/', getAllTopics);
topicRouter.put('/select', selectTopics);
topicRouter.get('/me', getUserTopics);

topicRouter.post('/create', createTopic);
topicRouter.get('/:topicId', getPostsByTopic);
topicRouter.post('/:topicId', createPost);


module.exports = topicRouter;