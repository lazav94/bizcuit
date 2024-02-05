import Joi from "joi";

import { emailSchema, passwordSchema } from "../../services/validator";

export const createSchema = Joi.object({
  name: Joi.string().required(),
  email: emailSchema.required(),
  password: passwordSchema.required(),
});

export const loginSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
});
