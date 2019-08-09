import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {getTableNameWithPrefix} from '../../src/util/helper';
import {SettingValueTypeOptions} from '../../src/entity/options';

export class SettingCreateTable1565174342884 implements MigrationInterface {

  protected tableName = getTableNameWithPrefix('server_tag');

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
          isUnique: true,
          comment: 'settings user creator',
        },
        {
          name: 'setting_key',
          type: 'varchar',
          length: '191',
          charset: 'utf8mb4',
          comment: 'setting key',
        },
        {
          name: 'setting_value',
          type: 'text',
          charset: 'utf8mb4',
          comment: 'setting values',
        },
        {
          name: 'setting_value_type',
          type: 'enum',
          enum: [
            SettingValueTypeOptions.string,
            SettingValueTypeOptions.boolean,
            SettingValueTypeOptions.float,
            SettingValueTypeOptions.int,
            SettingValueTypeOptions.json,
          ],
          default: SettingValueTypeOptions.string,
          comment: 'setting value type',
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
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }

}
