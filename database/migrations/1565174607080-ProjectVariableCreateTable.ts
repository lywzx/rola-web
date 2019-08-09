import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/helper';

export class ProjectVariableCreateTable1565174607080 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('project_variable');

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
          length: '60',
          comment: 'variable key name',
        },
        {
          name: 'display_name',
          type: 'varchar',
          length: '100',
          comment: 'variable display name',
        },
        {
          name: 'value',
          type: 'varchar',
          length: '2000',
          charset: 'utf8mb4',
          default: '""',
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
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }

}
