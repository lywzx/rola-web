import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {YesOrNo} from '../../src/entity/options';
import {getTableNameWithPrefix} from '../../src/util/helper';

export class UserCreateTable1565168967535 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('user');

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'int',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'user_name',
          type: 'varchar',
          length: '80',
          isNullable: true,
          isUnique: true,
          comment: 'login user name',
        },
        {
          name: 'email',
          type: 'varchar',
          length: '191',
          isNullable: true,
          isUnique: true,
          comment: 'login user email',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '30',
          default: '""',
          charset: 'utf8mb4',
        },
        {
          name: 'avatar',
          type: 'varchar',
          length: '400',
          default: '""',
          charset: 'utf8mb4',
          comment: 'user avatar url',
        },
        {
          name: 'password',
          type: 'varchar',
          comment: 'login user password',
        },
        {
          name: 'lock',
          type: 'enum',
          enum: [YesOrNo.yes.toString(), YesOrNo.no.toString()],
          default: `'${YesOrNo.yes}'`,
          comment: 'user is locked',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable(this.tableName);

    await queryRunner.dropTable(this.tableName);

  }

}
