const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const auth = require('../middleware/auth');

const getProfile = [
    auth,
    async (req, res) => {
        const userId = req.user.id

        const user = await prisma.user.findUnique({
            where: { 
                id: userId 
            },
            include: {
                posts: true,
                comments: true,
                topics: true
            }
        });

        res.json({
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            postCount: user.posts.length,
            commentCount: user.comments.length,
            topics: user.topics
        })
    }
]

module.exports = {
    getProfile
}