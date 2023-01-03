import { registerDecorator, ValidationOptions, ValidationArguments, buildMessage } from 'class-validator';

export function IsMatch(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMatch',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return relatedValue === args.value
        },
        defaultMessage: buildMessage(
          eachPrefix => eachPrefix + '$property must be equal to $constraint1',
          validationOptions
        ),
      },
    });
  };
}