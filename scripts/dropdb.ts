import 'reflect-metadata';
import { Bill } from '../src/bills/entities/bill.entity';
import { User } from '../src/auth/entities/user.entity';
import { Connection, createConnection, getRepository } from 'typeorm';
import { readFileSync } from 'fs';
import * as path from 'path';

const config = JSON.parse(
  readFileSync(path.resolve(__dirname, '..', '..', 'ormconfig.json'), 'utf-8'),
);

createConnection({
  ...config,
  entities: [Bill, User],
  // entities: [Bill],
}).then(async (c: Connection) => {
  await c.dropDatabase();
  console.log('DB Dropped!');
});
