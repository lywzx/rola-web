import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';

export class ProjectServerCreateTable1565174517613 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('project_server');

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
          name: 'project_id',
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
          referencedTableName: getTableNameWithPrefix('project'),
          columnNames: ['project_id'],
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
