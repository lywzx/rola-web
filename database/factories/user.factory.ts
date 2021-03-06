import { UserEntity } from '../../src/entity/user.entity';
import {define} from 'typeorm-seeding';
import * as Faker from 'faker';

define(UserEntity, (faker: typeof Faker, settings: { roles: string[] }) => {
  const user = new UserEntity();

  user.name = faker.name.findName();
  user.user_name = 'administrator';
  user.avatar = faker.image.avatar();
  user.email = faker.internet.email();
  user.password = '123456';
  return user;
});
