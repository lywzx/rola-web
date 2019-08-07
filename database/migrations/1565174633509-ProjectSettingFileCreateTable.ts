import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';

export class ProjectSettingFileCreateTable1565174633509 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('project_setting_file');

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
          name: 'name',
          type: 'varchar',
          length: '191',
          charset: 'utf8mb4',
          comment: 'file name',
        },
        {
          name: 'file_path',
          type: 'varchar',
          length: '191',
          charset: 'utf8mb4',
          comment: 'file path',
        },
        {
          name: 'content',
          type: 'text',
          charset: 'utf8mb4',
          comment: 'file content',
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
      uniques: [
        {
          columnNames: ['project_id', 'name'],
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
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }

}
