import { validate } from 'class-validator';
import { ValidationException } from '../errors/validation-exception';

export const applicationValidateOrReject = async (
  object: object,
  message?: string
) => {
  // console.log('applicationValidateOrReject:', object);
  const errors = await validate(object);
  console.log('applicationValidateOrReject Error:', errors);
  if (errors.length > 0) throw new ValidationException(errors, message);
};
