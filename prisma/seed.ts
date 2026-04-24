import { prisma } from '../src/lib/prisma';

async function main() {
  const aymen = await prisma.user.create({
    data: { id: '1', name: 'Aymen', email: 'aymen@gmail.com', role: 'ADMIN' },
  });
  const sara = await prisma.user.create({
    data: { id: '2', name: 'Sara', email: 'sara@gmail.com', role: 'USER' },
  });
  const aziz = await prisma.user.create({
    data: { id: '3', name: 'Aziz', email: 'aziz@gmail.com', role: 'USER' },
  });

  const react      = await prisma.skill.create({ data: { id: '1', designation: 'React' } });
  const nodejs     = await prisma.skill.create({ data: { id: '2', designation: 'Node.js' } });
  const typescript = await prisma.skill.create({ data: { id: '3', designation: 'TypeScript' } });
  const spring     = await prisma.skill.create({ data: { id: '4', designation: 'Spring Boot' } });
  const docker     = await prisma.skill.create({ data: { id: '5', designation: 'Docker' } });

  await prisma.cv.create({
    data: {
      id: '101',
      name: 'FullStack Dev',
      age: 28,
      job: 'Freelancer',
      userId: aymen.id,
      skills: { connect: [{ id: react.id }, { id: nodejs.id }, { id: typescript.id }] },
    },
  });

  await prisma.cv.create({
    data: {
      id: '102',
      name: 'Backend Dev',
      age: 32,
      job: 'Engineer',
      userId: sara.id,
      skills: { connect: [{ id: nodejs.id }, { id: spring.id }, { id: docker.id }] },
    },
  });

  await prisma.cv.create({
    data: {
      id: '103',
      name: 'Frontend Dev',
      age: 25,
      job: 'Intern',
      userId: aziz.id,
      skills: { connect: [{ id: react.id }, { id: typescript.id }] },
    },
  });

  console.log('Database seeded.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => (prisma as any).$disconnect?.());
