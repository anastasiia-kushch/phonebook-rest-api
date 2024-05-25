import Joi from 'joi';

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validSubscriptions = ['starter', 'pro', 'business'];

export const subscriptionUserSchema = Joi.object({
  subscription: Joi.string()
    .valid(...validSubscriptions)
    .required(),
});

export const resendVerifySchema = Joi.object({
  email: Joi.string().email().required(),
}).messages({ message: 'Missing required field email' });
