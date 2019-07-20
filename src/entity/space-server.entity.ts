import {Entity, PrimaryColumn} from 'typeorm';

@Entity({
  name: 'space_server',
})
export class SpaceServerEntity {

  @PrimaryColumn({
    unsigned: true,
  })
  'space_id': number;

  @PrimaryColumn({
    unsigned: true,
  })
  'server_id': number;
}
