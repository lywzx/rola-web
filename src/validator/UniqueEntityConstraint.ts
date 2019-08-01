import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {
  getManager, ObjectLiteral,
} from 'typeorm';
import {UniqueEntityConstraintOptions} from './UniqueEntityConstraintOptions';
import {getWhereAndValue} from '../util/fn';

@ValidatorConstraint({
  async: true,
  name: 'uniqueEntity',
})
export class UniqueEntityConstraint implements ValidatorConstraintInterface {

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `The ${validationArguments.property} has already been taken.`;
  }

  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    const options = validationArguments.constraints[0] as UniqueEntityConstraintOptions;
    const tableName = options.table ? options.table : validationArguments.targetName;
    const columnName = options.columnName ? options.columnName : validationArguments.property;
    const manage = getManager(options.connection);
    const tablePrefix = manage.connection.options.entityPrefix;

    let query = manage
      .createQueryBuilder()
      .select('*')
      .from(tablePrefix + tableName, 'tbl');

    query = query.andWhere(`${columnName} = :${columnName}`, {
      [columnName]: value,
    });

    if (options.where) {
      const [whereDep, whereValue] = getWhereAndValue(options.where, '=');
      if (whereDep) {
        query = query.andWhere(whereDep, whereValue);
      }
    }

    if (options.whereDepColumn) {
      const [whereDep, whereValue] = getWhereAndValue(options.whereDepColumn, '=', [validationArguments.object]);
      if (whereDep) {
        query = query.andWhere(whereDep, whereValue);
      }
    }

    if (options.ignore) {
      const [whereDep, whereValue] = getWhereAndValue(options.ignore, '<>');
      if (whereDep) {
        query = query.andWhere( whereDep, whereValue );
      }
    }

    if (options.ignoreDepColumn) {
      const [whereDep, whereValue] = getWhereAndValue(options.ignoreDepColumn, '<>', [validationArguments.object]);
      if (whereDep) {
        query = query.andWhere( whereDep, whereValue );
      }
    }
    const [sql, params] = query.getQueryAndParameters();
    return manage.query(`SELECT EXISTS(${sql}) as 'exists'`, params).then(([{ exists }]) => {
      return exists === '0';
    });
  }
}

export function UniqueEntity(options: UniqueEntityConstraintOptions, validationOptions?: ValidationOptions) {
  return (object: {}, propertyName: string) => {
    registerDecorator({
      async: true,
      constraints: [options],
      name: 'uniqueEntity',
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: UniqueEntityConstraint,
    });
  };
}
