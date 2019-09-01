import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {EntityConstraintOptions} from './EntityConstraintOptions';

@ValidatorConstraint({
  async: false,
  name: 'RepositoryUrl',
})
export class RepositoryUrlConstraint implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    return '';
  }

  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    return undefined;
  }

}

export function RepositoryUrl(options: EntityConstraintOptions, validationOptions?: ValidationOptions) {
  return (object: {}, propertyName: string) => {
    registerDecorator({
      async: true,
      constraints: [options],
      name: 'RepositoryUrl',
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: RepositoryUrl,
    });
  };
}
