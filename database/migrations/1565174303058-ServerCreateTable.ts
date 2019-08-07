import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';
import {YesOrNo} from '../../src/entity/options';

export class ServerCreateTable1565174303058 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('server');

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
          name: 'user_id',
          type: 'int',
          unsigned: true,
          comment: 'server creator id',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '60',
          charset: 'utf8mb4',
          comment: 'server name',
        },
        {
          name: 'ip_address',
          type: 'bigint',
          unsigned: true,
          comment: 'server ip address',
          default: 0,
        },
        {
          name: 'ssh_port',
          type: 'smallint',
          unsigned: true,
          comment: 'ssh port',
        },
        {
          name: 'ssh_user',
          type: 'varchar',
          length: '60',
          isNullable: true,
          comment: 'default login user',
        },
        {
          name: 'password',
          type: 'varchar',
          length: '62',
          default: '""',
          comment: 'server default password',
        },
        {
          name: 'description',
          type: 'varchar',
          charset: 'utf8mb4',
          default: '""',
          length: '300',
          comment: 'server description info',
        },
        {
          name: 'lock',
          type: 'enum',
          enum: [YesOrNo.yes.toString(), YesOrNo.no.toString()],
          default: YesOrNo.yes,
          comment: 'server is locked',
        },
        {
          name: 'created_at',
          type: 'timestamp',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
        },
      ],
      foreignKeys: [
        {
          referencedTableName: getTableNameWithPrefix('user'),
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }

}
