// @ts-nocheck
import { PrismaClient, OlympiadLevel, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@olimpiads.ai' },
    update: {},
    create: {
      email: 'admin@olimpiads.ai',
      name: 'Platform Admin',
      passwordHash: 'demo-hash',
      role: UserRole.ADMIN
    }
  });

  const math = await prisma.subject.upsert({
    where: { name: 'Математика' },
    update: {},
    create: { name: 'Математика' }
  });

  const equations = await prisma.topic.upsert({
    where: { subjectId_name: { subjectId: math.id, name: 'Уравнения' } },
    update: {},
    create: { subjectId: math.id, name: 'Уравнения' }
  });

  const olympiad = await prisma.olympiad.upsert({
    where: { slug: 'algebra-sprint' },
    update: {},
    create: {
      title: 'Algebra Sprint 2026',
      slug: 'algebra-sprint',
      description: 'Тренировочная олимпиада по алгебре',
      level: OlympiadLevel.ADVANCED,
      ageGroup: '8-9 класс',
      durationMinutes: 45,
      subjectId: math.id,
      authorId: admin.id,
      isPublished: true
    }
  });

  await prisma.question.createMany({
    data: [
      {
        olympiadId: olympiad.id,
        topicId: equations.id,
        text: 'Решите уравнение x^2 - 5x + 6 = 0',
        options: ['x = 2 и x = 3', 'x = -2 и x = -3', 'x = 1 и x = 6', 'Нет корней'],
        correctAnswer: 'x = 2 и x = 3',
        explanation: 'Разложите на множители: (x-2)(x-3)=0.',
        difficulty: 1
      }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
