require('dotenv').config();
const express = require('express');
const cors = require('cors');

const topicRouter = require('./routes/topicRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/topics', topicRouter);  
app.use('/auth', authRouter);     
app.use('/user', userRouter); 
app.use('/posts', postRouter);
app.use('/comments', commentRouter); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});