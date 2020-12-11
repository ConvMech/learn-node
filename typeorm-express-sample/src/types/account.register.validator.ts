import { celebrate, Joi } from 'celebrate';

export const regesiterValidator = celebrate({
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
});