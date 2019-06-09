import {Factory, Seed} from 'typeorm-seeding';
import {Connection} from 'typeorm';
import {User} from '../../auth/user.entity';

export default class CreateUsers implements Seed {
  public async seed(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)({}).seedMany(10);
  }
}
