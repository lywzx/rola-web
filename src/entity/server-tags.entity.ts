import {Entity, PrimaryColumn} from 'typeorm';

@Entity('server_tag')
export class ServerTagsEntity {

  @PrimaryColumn()
  'server_id': number;

  @PrimaryColumn()
  'tag_id': number;
}
