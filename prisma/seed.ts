import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed categories
  const categories = [
    { name: 'Terror' },
    { name: 'Suspenso' },
    { name: 'Drama' },
    { name: 'Comedia' }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: { name: category.name }
    });
  }

  console.log('Categories seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {

    await prisma.$disconnect();
  });