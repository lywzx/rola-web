import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';

export class ProjectEnvironmentSettingFileCreateTable1565174711413 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('project_environment_setting_file');

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
          name: 'project_setting_file_id',
          unsigned: true,
          type: 'int',
          isPrimary: true,
          comment: 'project variable id',
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
          referencedTableName: getTableNameWithPrefix('project_setting_file'),
          columnNames: ['project_setting_file_id'],
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
