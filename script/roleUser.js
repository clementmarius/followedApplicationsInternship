const prisma = require('../libs/prisma');

async function main() {
    const adminRole = await prisma.role.create({
        data: {
            name: 'ADMIN',
        },
    });

    const userRole = await prisma.role.create({
        data: {
            name: 'USER',
        },
    });

    console.log({ adminRole, userRole });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
