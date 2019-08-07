import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';

export class PermissionRoleCreateTable1565172112371 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('permission_role');

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
          name: 'role_id',
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
          referencedTableName: getTableNameWithPrefix('role'),
          columnNames: ['role_id'],
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
