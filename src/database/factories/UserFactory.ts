import {User} from '../../auth/user.entity';
import {define} from 'typeorm-seeding';
import * as Faker from 'faker';

define(User, (faker: typeof Faker, settings: { roles: string[] }) => {
  const user = new User();

  user.name = faker.name.findName();
  user.user_name = 'administrator';
  user.avatar = faker.image.avatar();
  user.email = faker.internet.email();
  user.password = '123456';
  return user;
});
