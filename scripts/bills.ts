import { Bill } from '../src/bills/entities/bill.entity';
import { Connection, createConnection, getRepository } from 'typeorm';
import { readFileSync } from 'fs';
import * as path from 'path';
import { User } from '../src/auth/entities/user.entity';
import * as bcrypt from 'bcrypt';

const config = JSON.parse(
  readFileSync(path.resolve(__dirname, '..', 'ormconfig.json'), 'utf-8'),
);

createConnection({
  ...config,
  entities: [Bill, User],
}).then((c: Connection) => {
  User.createQueryBuilder()
    .where('email = :email', { email: 'mandrewdarts@gmail.com' })
    .getOne()
    .then(async (user) => {
      console.log(user);
      if (user) {
        console.log(user.password);
        console.log(await bcrypt.compare('passord', user.password));
      }
    });
});
