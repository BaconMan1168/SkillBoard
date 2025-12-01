const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const auth = require('../middleware/auth');

async function getAllTopics(req, res){
    try {
        const topics = await prisma.topic.findMany();
        res.status(200).json(topics);
    }
    catch (err) {
        res.json({ error: err.message })
    }
}

const selectTopics = [
    auth,
    async (req, res) => {
        const userId = req.user.id
        const { topics } = req.body

        try {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    topics: {
                        set: topics.map(topicId => ({ id: topicId }))
                    }
                }
            });

            res.status(200).json({ message: 'Topics updated' });
        } 
        catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    }
]

const getUserTopics = [
    auth,
    async (req, res) => {
        const userId = req.user.id

        try {
            const userTopics = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    topics: {
                        select: {
                            id: true,
                            title: true,
                        }
                    },
                },
            })
            res.status(200).json(userTopics)
        }
        catch (err) {
            console.error(err);
            res.json({ error: err.message })
        }

    }
]

const createTopic = [
    auth,
    async (req, res) => {
        const { title } = req.body;

        try {
            let topic = await prisma.topic.findUnique({
                where: { title }
            });

            if (!topic) {
                topic = await prisma.topic.create({
                    data: { title }
                });
            }

            res.status(201).json(topic);
        } 
        catch (err) {
            console.error(err);
            res.json({ error: err.message })
        }
    }
];

module.exports = {
    getAllTopics,
    selectTopics,
    getUserTopics,
    createTopic

}