import {Factory, Seed} from 'typeorm-seeding';
import {Connection} from 'typeorm';
import { UserEntity } from '../../src/entity/user.entity';

export default class UserCreate implements Seed {
  public async seed(factory: Factory, connection: Connection): Promise<any> {
    const entityManage = connection.createEntityManager();
    const user = await factory(UserEntity)({}).make();

    const isExist = await entityManage.count(UserEntity, { user_name: user.user_name });
    if (isExist === 0) {
      await entityManage.save(user);
    }
  }
}
