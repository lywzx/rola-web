import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/helper';
import {ProjectRepositoryOnlineLogo, ProjectRepositoryType} from '../../src/entity/options';

export class ProjectRepositoryCreateTable1567055746450 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('project_repository');

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'int',
          unsigned: true,
          isGenerated: true,
          isPrimary: true,
          generationStrategy: 'increment',
        },
        {
          name: 'user_id',
          type: 'int',
          unsigned: true,
          isNullable: true,
          comment: 'belong to user id',
        },
        {
          name: 'project_id',
          type: 'int',
          unsigned: true,
          comment: 'repository belong to project',
        },
        {
          name: 'type',
          type: 'enum',
          enum: [ProjectRepositoryType.git, ProjectRepositoryType.svn],
          default: `'${ProjectRepositoryType.git}'`,
          comment: 'the project repository type',
        },
        {
          name: 'url',
          type: 'varchar',
          length: '300',
          default: '""',
          comment: 'the project repository url',
        },
        {
          name: 'online_logo',
          type: 'enum',
          enum: [ProjectRepositoryOnlineLogo.tag, ProjectRepositoryOnlineLogo.branch],
          default: `"${ProjectRepositoryOnlineLogo.branch}"`,
          comment: 'online mode',
        },
        {
          name: 'default_branch',
          type: 'varchar',
          length: '30',
          default: '"master"',
          comment: 'default branch name',
        },
        {
          name: 'destination',
          type: 'varchar',
          length: '400',
          default: '""',
          charset: 'utf8mb4',
          comment: 'file save full path',
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
          referencedTableName: getTableNameWithPrefix('user'),
          columnNames: ['user_id'],
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
