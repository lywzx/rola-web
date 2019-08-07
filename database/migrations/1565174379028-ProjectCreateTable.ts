import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';
import {ProjectStatusOptions, YesOrNo} from '../../src/entity/options';

export class ProjectCreateTable1565174379028 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('project');

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
          name: 'space_id',
          type: 'int',
          unsigned: true,
          comment: 'the project belong to space',
        },
        {
          name: 'user_id',
          type: 'int',
          unsigned: true,
          comment: 'creator id',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '191',
          charset: 'utf8mb4',
          comment: 'project name',
        },
        {
          name: 'description',
          type: 'varchar',
          length: '300',
          default: '""',
          charset: 'utf8mb4',
          comment: 'project description',
        },
        {
          name: 'status',
          type: 'enum',
          enum: [
            ProjectStatusOptions.lock.toString(),
            ProjectStatusOptions.ok.toString(),
          ],
          default: `'${ProjectStatusOptions.lock.toString()}'`,
          comment: 'the project status is locked',
        },
        {
          name: 'require_review',
          type: 'enum',
          enum: [
            YesOrNo.yes.toString(),
            YesOrNo.no.toString(),
          ],
          default: YesOrNo.yes.toString(),
          comment: 'Need to be reviewed before going online',
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
          referencedTableName: getTableNameWithPrefix('space'),
          columnNames: ['space_id'],
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
