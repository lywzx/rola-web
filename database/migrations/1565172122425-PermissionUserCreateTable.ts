import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';

export class PermissionUserCreateTable1565172122425 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('permission_user');

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'permission_id',
          type: 'int',
          unsigned: true,
          isPrimary: true,
        },
        {
          name: 'user_id',
          type: 'int',
          unsigned: true,
          isPrimary: true,
        },
      ],
      foreignKeys: [
        {
          referencedTableName: getTableNameWithPrefix('permission'),
          columnNames: ['permission_id'],
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          referencedTableName: getTableNameWithPrefix('user'),
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }

}
