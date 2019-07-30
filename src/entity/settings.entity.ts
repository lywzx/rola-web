import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './user.entity';
import { SettingValueTypeOptions } from './options';

@Entity({
  name: 'settings',
})
export class SettingsEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @ManyToOne(type => UserEntity, {
    nullable: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @Column({
    length: 191,
    unique: true,
    charset: 'utf8mb4',
  })
  'setting_key': string;

  @Column({
    type: 'text',
    charset: 'utf8mb4',
  })
  'setting_value': string;

  @Column({
    type: 'enum',
    enum: SettingValueTypeOptions,
    default: SettingValueTypeOptions.string,
  })
  'setting_value_type': SettingValueTypeOptions;
}
