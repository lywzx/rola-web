import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';
import {YesOrNo} from '../../src/entity/options';

export class ProjectEnvironmentCreateTable1565174501227 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('project_environment');

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
          type: 'int',
          unsigned: true,
          comment: 'the environment belong to project',
        },
        {
          name: 'environment_id',
          type: 'int',
          unsigned: true,
          comment: 'the origin environment id',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '60',
          comment: 'the project environment name',
        },
        {
          name: 'display_name',
          type: 'varchar',
          length: '200',
          charset: 'utf8mb4',
          comment: 'the environment visible name',
        },
        {
          name: 'lock',
          type: 'enum',
          default: `'${YesOrNo.no}'`,
          enum: [YesOrNo.yes.toString(), YesOrNo.no.toString()],
          comment: 'the environment status',
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
          columnNames: [
            'project_id',
            'environment_id',
          ],
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
          referencedTableName: getTableNameWithPrefix('environment'),
          columnNames: ['environment_id'],
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
