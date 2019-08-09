import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';

export class FileCreateTable1565344144152 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('file');

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
          name: 'name',
          type: 'varchar',
          length: '191',
          charset: 'utf8mb4',
          comment: 'file name with extension',
        },
        {
          name: 'ext',
          type: 'varchar',
          length: '40',
          comment: 'file extension',
        },
        {
          name: 'mime_type',
          type: 'varchar',
          length: '40',
          comment: 'file mime type',
        },
        {
          name: 'size',
          type: 'bigint',
          unsigned: true,
          default: 0,
          comment: 'file size',
        },
        {
          name: 'path',
          type: 'varchar',
          length: '2000',
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
        {
          name: 'updated_at',
          type: 'timestamp',
          isNullable: true,
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
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }

}
