import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/helper';

export class SpaceCreateTable1565174262902 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('space');

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
          type: 'int',
          unsigned: true,
          comment: 'space creator id',
        },
        {
          name: 'owner_id',
          type: 'int',
          unsigned: true,
          isNullable: true,
          comment: 'space owner',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '60',
          comment: 'space name',
          charset: 'utf8mb4',
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
          referencedTableName: getTableNameWithPrefix('user'),
          columnNames: ['owner_id'],
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
