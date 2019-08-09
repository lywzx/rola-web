import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/helper';
import {ProjectDeployOptions, ProjectDeployShellTypeOptions} from '../../src/entity/options';

export class ProjectDeployCreateTable1565174679606 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('project_deploy');

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
          name: 'project_id',
          unsigned: true,
          type: 'int',
          comment: 'project id',
        },
        {
          name: 'step_id',
          unsigned: true,
          type: 'tinyint',
          comment: 'step id',
        },
        {
          name: 'step_type',
          type: 'enum',
          enum: [
            ProjectDeployOptions.before.toString(),
            ProjectDeployOptions.after.toString(),
          ],
          default: `'${ProjectDeployOptions.before}'`,
          comment: 'deploy type , before or after',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '60',
          default: '""',
          comment: 'shell bash name',
        },
        {
          name: 'run_user',
          type: 'varchar',
          length: '30',
          default: '""',
          comment: 'The user of the script execution, null will dependency project',
        },
        {
          name: 'shell_content',
          type: 'text',
          charset: 'utf8mb4',
          comment: 'shell content',
        },
        {
          name: 'shell_type',
          type: 'enum',
          enum: [
            ProjectDeployShellTypeOptions.up.toString(),
            ProjectDeployShellTypeOptions.down.toString(),
          ],
          default: `'${ProjectDeployShellTypeOptions.up.toString()}'`,
          comment: 'shell type',
        },
        {
          name: 'is_optional',
          type: 'boolean',
          default: true,
          comment: 'is optional shell',
        },
        {
          name: 'checked',
          type: 'boolean',
          default: true,
          comment: 'default checked',
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
      ],
      uniques: [
        {
          columnNames: [
            'step_id',
            'step_type',
            'project_id',
          ],
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }

}
