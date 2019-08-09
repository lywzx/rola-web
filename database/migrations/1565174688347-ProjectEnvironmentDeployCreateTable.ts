import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/helper';

export class ProjectEnvironmentDeployCreateTable1565174688347 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('project_environment_deploy');

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
          name: 'project_deploy_id',
          unsigned: true,
          type: 'int',
          isPrimary: true,
          comment: 'project deploy id',
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
          referencedTableName: getTableNameWithPrefix('project_deploy'),
          columnNames: ['project_deploy_id'],
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
