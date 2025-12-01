const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

const createComment = [
    auth,
    async (req, res) => {
        const postId = parseInt(req.params.postId);
        const authorId = req.user.id;
        const { body } = req.body;

        try {
            const comment = await prisma.comment.create({
                data: { 
                    postId, 
                    authorId, 
                    body },
                include: { 
                    author: { 
                        select: { 
                            id: true, 
                            name: true 
                        } 
                    } 
                }
            });

            res.status(201).json(comment);
        } 
        catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
];

module.exports = { createComment };
