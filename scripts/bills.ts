import 'reflect-metadata';
import { Bill } from '../src/bills/entities/bill.entity';
import { User } from '../src/auth/entities/user.entity';
import { Connection, createConnection, getRepository } from 'typeorm';
import { readFileSync } from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import { BillsController } from 'src/bills/bills.controller';

const config = JSON.parse(
  readFileSync(path.resolve(__dirname, '..', '..', 'ormconfig.json'), 'utf-8'),
);

createConnection({
  ...config,
  entities: [Bill, User],
  // entities: [Bill],
}).then(async (c: Connection) => {
  const user = getRepository(User).create({
    first_name: 'Andrew',
    last_name: 'Darts',
    email: 'mandrewdarts@gmail.com',
    password: 'password',
  });

  const bill1 = await getRepository(Bill).create({
    name: 'Internet',
    amount: 7000,
    due: new Date(),
  });

  const bill2 = await getRepository(Bill).create({
    name: 'Rent',
    amount: 2100,
    due: new Date(),
  });

  user.bills = [bill1, bill2];

  await user.save();

  const u = await getRepository(User).findOne(
    { email: 'mandrewdarts@gmail.com' },
    { relations: ['bills'] },
  );

  console.log(u);
});
