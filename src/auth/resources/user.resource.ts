import { User } from '../entities/user.entity';

export const UserResource = (user: User) => ({
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
});
