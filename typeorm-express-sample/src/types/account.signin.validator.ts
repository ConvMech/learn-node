import { celebrate, Joi } from 'celebrate';

export const postSignInValidator = celebrate({
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
});