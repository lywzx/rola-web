import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';

export class RoleCreateTable1565172064595 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('role');

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
          name: 'name',
          type: 'varchar',
          length: '60',
          default: '""',
          isUnique: true,
          comment: 'role name',
        },
        {
          name: 'display_name',
          type: 'varchar',
          length: '100',
          comment: 'role display name',
          charset: 'utf8mb4',
          default: '""',
        },
        {
          name: 'description',
          type: 'varchar',
          length: '300',
          comment: 'role description',
          charset: 'utf8mb4',
          default: '""',
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
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }

}
