import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/helper';

export class SpaceServerCreateTable1565174356932 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('space_server');

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'space_id',
          type: 'int',
          unsigned: true,
          isPrimary: true,
        },
        {
          name: 'server_id',
          type: 'int',
          unsigned: true,
          isPrimary: true,
        },
      ],
      foreignKeys: [
        {
          referencedTableName: getTableNameWithPrefix('space'),
          columnNames: ['space_id'],
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          referencedTableName: getTableNameWithPrefix('server'),
          columnNames: ['server_id'],
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
