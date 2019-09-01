import {createParamDecorator, HttpException} from '@nestjs/common';
import {getConnection} from 'typeorm';
import {isFunction} from 'lodash';

export const RouterEntity = createParamDecorator(async (data, req) => {
  if (!Array.isArray(data)) {
    data = [data, Object.keys(req.params)[0]];
  }

  const [type, param] = data;
  const value = req.params[param];
  const query = {};

  query[param] = value;
  const connection = getConnection();
  let typeReopsitory = type;
  if (!isFunction(typeReopsitory.findOne)) {
    typeReopsitory = connection.getRepository(type);
  }
  const entity = await typeReopsitory.findOne(query);

  if (!entity) {
    throw new HttpException({error: 'Entity not found'}, 404);
  }
  return entity;
});
