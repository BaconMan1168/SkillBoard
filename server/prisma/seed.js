const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const topics = [
        { title: 'AP Calculus BC' },
        { title: 'Read Write Publish' },
        { title: 'AP Economics' },
    ];

    for (const t of topics) {
        await prisma.topic.upsert({
            where: { 
                title: t.title 
            },
            update: {},
            create: t
        });
    }

    console.log('Seeded topics.');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
