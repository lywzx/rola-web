import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';
import {ProjectRepositoryOnlineLogo, ProjectRepositoryType} from '../../src/entity/options';

export class ProjectRepositoryCreateTable1565174883488 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('project_environment_setting_file');

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
          name: 'user_id',
          unsigned: true,
          type: 'int',
          comment: 'create user id',
        },
        {
          name: 'project_id',
          unsigned: true,
          type: 'int',
          comment: 'project id',
        },
        {
          name: 'type',
          type: 'enum',
          enum: [
            ProjectRepositoryType.git.toString(),
            ProjectRepositoryType.svn.toString(),
          ],
          default: ProjectRepositoryType.git,
          comment: 'project repository type, e.g: svn, git'
        },
        {
          name: 'url',
          type: 'varchar',
          length: '300',
          charset: 'utf8mb4',
          default: '""',
          comment: 'git or svn url',
        },
        {
          name: 'online_logo',
          type: 'enum',
          enum: [
            ProjectRepositoryOnlineLogo.branch.toString(),
            ProjectRepositoryOnlineLogo.tag.toString(),
          ],
          default: ProjectRepositoryOnlineLogo.branch,
          comment: 'online mode',
        },
        {
          name: 'default_branch',
          type: 'varchar',
          length: '30',
          default: 'master',
          comment: 'default branch name',
        },
        {
          name: 'destination',
          type: 'varchar',
          length: '400',
          default: '',
          charset: 'utf8mb4',
          comment: 'project save destination',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
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
          referencedTableName: getTableNameWithPrefix('user'),
          columnNames: ['user_id'],
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
