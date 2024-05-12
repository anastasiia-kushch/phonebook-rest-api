import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  phone: Joi.string().required().min(3),
})
  .min(3)
  .messages({ 'object.min': 'Body must have all fields' });

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().min(3),
})
  .min(1)
  .messages({ 'object.min': 'Body must have at least one field' });
