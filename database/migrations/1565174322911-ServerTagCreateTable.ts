import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';

export class ServerTagCreateTable1565174322911 implements MigrationInterface {
  protected tableName = getTableNameWithPrefix('server_tag');

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'server_id',
          unsigned: true,
          type: 'int',
          isPrimary: true,
        },
        {
          name: 'tag_id',
          unsigned: true,
          type: 'int',
          isPrimary: true,
        },
      ],
      foreignKeys: [
        {
          referencedTableName: getTableNameWithPrefix('server'),
          columnNames: ['server_id'],
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          referencedTableName: getTableNameWithPrefix('tag'),
          columnNames: ['tag_id'],
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropTable(this.tableName);
  }

}
