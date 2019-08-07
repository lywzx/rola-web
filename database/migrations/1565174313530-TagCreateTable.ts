import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/config';

export class TagCreateTable1565174313530 implements MigrationInterface {
  protected tableName = getTableNameWithPrefix('tag');

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
          name: 'name',
          type: 'varchar',
          length: '60',
          isUnique: true,
          comment: 'tag name',
        },
        {
          name: 'display_name',
          type: 'varchar',
          length: '200',
          charset: 'utf8mb4',
          comment: 'tag display name',
        },
        {
          name: 'description',
          type: 'varchar',
          charset: 'utf8mb4',
          default: '""',
          length: '400',
          comment: 'tag description info',
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
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }

}
