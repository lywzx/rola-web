import {define} from 'typeorm-seeding';
import {TagsEntity} from '../../src/entity/tags.entity';
import * as Faker from 'faker';

define(TagsEntity, (faker: typeof Faker, {name, display_name}: {name?: string, display_name?: string}) => {
    const tag = new TagsEntity();
    if (name) {
      tag.name = name;
    } else {
      tag.name = faker.name.findName();
    }

    if (display_name) {
      tag.display_name = display_name;
    } else {
      tag.display_name = faker.name.firstName();
    }

    return tag;
});
