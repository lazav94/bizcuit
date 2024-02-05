import Joi from "joi";
import { idSchema } from "../../services/validator";

export const createSchema = Joi.object({
  description: Joi.string(),
});

export const updateSchema = Joi.object({
  description: Joi.string().optional(),
  isCompleted: Joi.boolean().optional(),
});
