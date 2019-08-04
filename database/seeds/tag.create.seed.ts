import {Factory, Seed, times} from 'typeorm-seeding';
import {Connection} from 'typeorm';
import {TagsEntity} from '../../src/entity/tags.entity';

export default class TagCreateSeed implements Seed {
  public async seed(factory: Factory, connection: Connection): Promise<any> {
    const entityManage = connection.createEntityManager();
    const data = [
      {
        name: 'publishing_server',
        display_name: '发布服务器',
        description: '发部服务器，一般对CPU占用比较高',
      },
      {
        name: 'application_server',
        display_name: '应用服务器',
        description: '普通应用服务器，如：web服务器',
      },
    ];
    await times(data.length, async n => {

      const isExist = await entityManage.count(TagsEntity, {name: data[n].name});

      if (isExist === 0) {
        const tag = await factory(TagsEntity)(data[n]).make();

        await entityManage.save(tag);
      }
    });
  }
}
