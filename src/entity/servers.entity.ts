import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './base.entity';
import {SpacesEntity} from './spaces.entity';
import {User} from '../auth/user.entity';
import {YesOrNo} from './options';
import {
  IsIn, IsInt, IsIP, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, Min,
  ValidationOptions,
} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const {CREATE, UPDATE} = CrudValidationGroups;
@Entity({
  name: 'server',
})
export class ServersEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    unsigned: true,
  })
  'user_id': number;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty()
  @IsString({ always: true})
  @MaxLength(60)
  @Column({
    length: 60,
  })
  name: string;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty()
  @IsIP()
  @Column({
    type: 'int',
    unsigned: true,
  })
  'ip_address': number;

  @IsOptional({groups: [UPDATE]} as ValidationOptions)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Column({
    type: 'smallint',
    unsigned: true,
  })
  'ssh_port': number;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{2,59}$/)
  @Column({
    length: 60,
    nullable: true,
  })
  'ssh_user': string;

  @IsOptional()
  @IsString()
  @MaxLength(62)
  @Column({
    length: 62,
    nullable: true,
  })
  'password': string;

  @IsOptional()
  @IsString({ always: true})
  @MaxLength(300)
  @Column({
    length: 300,
    default: '',
    charset: 'utf8mb4',
  })
  description: string;

  @IsOptional()
  @IsIn([YesOrNo.yes, YesOrNo.no])
  @Column({
    type: 'enum',
    enum: YesOrNo,
    default: YesOrNo.yes,
  })
  lock: YesOrNo;

  @ManyToMany( type => SpacesEntity)
  @JoinTable({
    name: 'space_server',
    joinColumn: {
      name: 'space_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'server_id',
      referencedColumnName: 'id',
    },
  })
  spaces: SpacesEntity[];

  @ManyToOne( type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  creator: User;
}
