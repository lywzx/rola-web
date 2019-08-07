import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';

export class ProjectEnvironmentVariableCreateTable1565174700185 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('project_environment_variable');

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'project_id',
          unsigned: true,
          type: 'int',
          isPrimary: true,
          comment: 'project id',
        },
        {
          name: 'project_environment_id',
          unsigned: true,
          type: 'int',
          isPrimary: true,
          comment: 'project environment id',
        },
        {
          name: 'project_variable_id',
          unsigned: true,
          type: 'int',
          isPrimary: true,
          comment: 'project variable id',
        },
        {
          name: 'value',
          type: 'varchar',
          length: '2000',
          default: '""',
          charset: 'utf8mb4',
        },
      ],
      foreignKeys: [
        {
          referencedTableName: getTableNameWithPrefix('project'),
          columnNames: ['project_id'],
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          referencedTableName: getTableNameWithPrefix('project_environment'),
          columnNames: ['project_environment_id'],
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          referencedTableName: getTableNameWithPrefix('project_variable'),
          columnNames: ['project_variable_id'],
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
