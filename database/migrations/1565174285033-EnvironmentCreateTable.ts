import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';

export class EnvironmentCreateTable1565174285033 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('environment');

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
          comment: 'environment belong to space',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '60',
          comment: 'environment name',
        },
        {
          name: 'display_name',
          type: 'varchar',
          length: '200',
          charset: 'utf8mb4',
          default: '""',
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
          columnNames: [ 'space_id', 'name'],
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
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }

}
