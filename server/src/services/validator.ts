import Joi, { AnySchema, ValidationOptions } from "joi";

export const idSchema = Joi.number().integer().required();

import {
  MAX_EMAIL_SIZE,
  MAX_PASSWORD_SIZE,
  MIN_EMAIL_SIZE,
  MIN_PASSWORD_SIZE,
} from "./consts";

// TODO we can make password more secure, require number, special character...
export const passwordSchema = Joi.string()
  .trim()
  .min(MIN_PASSWORD_SIZE)
  .max(MAX_PASSWORD_SIZE);

export const emailSchema = Joi.string()
  .trim()
  .regex(/^\S+@\S+\.\S+$/)
  .min(MIN_EMAIL_SIZE)
  .max(MAX_EMAIL_SIZE);

export const stringSchema = Joi.string().allow("").required();

/**
 * Validate (input) value according to the validation schema.
 * Throw the validation error if the schema definition is not satisfied.
 * @param   {AnySchema}         schema  Schema
 * @param   {T}                 value   Value to check
 * @param   {ValidationOptions} options Validation options
 * @returns {any}
 */
export const validate = async <T>(
  schema: AnySchema,
  value: T,
  options?: ValidationOptions
): Promise<T> => schema.validateAsync(value, { abortEarly: false, ...options });
