import { $Enums, PrismaClient, User } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

const prisma = new PrismaClient();
const { PWD_PEPPER } = process.env;

async function createUserAdmin(): Promise<User> {
  const salt = await genSalt();
  const hashPassword = await hash('senha@123', `${salt}${PWD_PEPPER}`);

  return prisma.user.create({
    data: {
      username: 'admin',
      document: '99999999900',
      email: 'admin@gmail.com',
      totalPoints: 0,
      birthDate: new Date(2002, 5, 10),
      password: hashPassword,
      salt,
      type: $Enums.UserType.ADMIN,
      address: {
        create: {
          postcode: '88915000',
          state: 'SC',
          city: 'Araranguá',
          neighborhood: 'Lorem Ipsum',
        },
      },
    },
  });
}

async function createUserPlayer(): Promise<User> {
  const salt = await genSalt();
  const hashPassword = await hash('senha@123', `${salt}${PWD_PEPPER}`);

  return prisma.user.create({
    data: {
      username: 'player',
      document: '99988899900',
      email: 'player@gmail.com',
      totalPoints: 0,
      birthDate: new Date(2002, 10, 21),
      password: hashPassword,
      salt,
      type: $Enums.UserType.PLAYER,
      address: {
        create: {
          postcode: '88325000',
          state: 'SC',
          city: 'Criciúma',
          neighborhood: 'Lorem Ipsum',
        },
      },
    },
  });
}

async function execute(): Promise<void> {
  try {
    await Promise.all([createUserAdmin(), createUserPlayer()]);
    await prisma.$disconnect();
  } catch (e) {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

execute();
