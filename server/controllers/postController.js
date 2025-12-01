const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const auth = require('../middleware/auth.js')

async function getPostsByTopic(req, res){
    const topicId = parseInt(req.params.topicId);

    try {
        const topic = await prisma.topic.findUnique({
            where: {
                id: topicId 
            },
            select: {
                title: true 
            }
        });

        const posts = await prisma.post.findMany({
            where: {
                topicId: topicId 
            },
            select: {
                id: true,
                title: true,
                body: true,
                createdAt: true,
                 
                author: {
                    select: {
                        id: true,
                        name: true 
                    }
                },
                comments: {
                    select: {
                        id: true,
                        body: true,
                        createdAt: true,
                        author: {
                            select: {
                                id: true,
                                name: true 
                            }
                        }
                    }
                }
            }
        });

        res.status(200).json({ posts, topic })
    }
    catch (err) {
        console.error(err);
        res.json({ error: err.message })
    }
}

const getUserPosts = [
    auth,
    async (req, res) => {
        const { id } = req.user

        try {
            const posts = await prisma.post.findMany({
                where: {
                    authorId: id 
                },
                select: {
                    id: true,
                    title: true,
                    body: true,
                    createdAt: true,
                    author: {
                        select: {
                            name: true
                        }
                    },
                    comments: {
                        select: {
                            id: true,
                            body: true,
                            createdAt: true,
                            author: {
                                select: {
                                    id: true,
                                    name: true 
                                }
                            }
                        }
                    }
                }
            });

            res.status(200).json(posts)
        }
        catch (err) {
            console.error(err);
            res.json({ error: err.message })
        }
    }
]

const createPost = [
    auth,
    async (req, res) => {
        const { title, body } = req.body;
        const topicId = parseInt(req.params.topicId)
        const authorId = req.user.id;

        try {
            const post = await prisma.post.create({
                data: { 
                    title, 
                    body, 
                    topicId, 
                    authorId 
                }
            });

            res.status(201).json(post);
        }
        catch (err) {
            console.error(err);
            res.json({ error: err.message })
        }
    }
]

const updatePost = [
    auth,
    async (req, res) => {
        const postId = parseInt(req.params.postId)
        const userId = req.user.id
        const { title, body } = req.body

        try {
            const updatedPost = await prisma.post.update({
                where: {
                    id: postId,
                    authorId: userId
                },
                data: {
                    title,
                    body
                }
            })

            res.status(200).json(updatedPost)
        }
        catch (err) {
            console.error(err);
            res.json({ error: err.message })
        }
    }
]

const deletePost = [
    auth,
    async (req, res) => {
        const postId = parseInt(req.params.postId)
        const userId = req.user.id

        try {
            await prisma.post.delete({
                where: {
                    id: postId,
                    authorId: userId
                }
            })

            return res.status(204).end();
        }
        catch (err) {
            console.error(err);
            res.json({ error: err.message })
        }
    }
]




module.exports = {
    getPostsByTopic,
    createPost,
    updatePost,
    deletePost,
    getUserPosts
}

