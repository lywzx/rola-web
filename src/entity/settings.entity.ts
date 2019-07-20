import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../auth/user.entity';
import { SettingValueTypeOptions } from './options';

@Entity({
  name: 'settings',
})
export class SettingsEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @ManyToOne(type => User, {
    nullable: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @Column({
    length: 90,
    unique: true,
  })
  'setting_key': string;

  @Column({
    type: 'text',
  })
  'setting_value': string;

  @Column({
    type: 'enum',
    enum: SettingValueTypeOptions,
    default: SettingValueTypeOptions.string,
  })
  'setting_value_type': SettingValueTypeOptions;
}
