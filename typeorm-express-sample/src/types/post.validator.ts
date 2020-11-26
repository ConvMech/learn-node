import { celebrate, Joi } from 'celebrate';

export const postPostValidator = celebrate({
  body: {
    title: Joi.string().max(50).required(),
    text: Joi.string().required()
  }
});

export const postPutByIdValidator = celebrate({
  params: {
    id: Joi.number().integer().positive().required()
  },
  body: {
    title: Joi.string().max(50).required(),
    text: Joi.string().required()
  }
});

export const postDelByIdValidator = celebrate({
  params: {
    id: Joi.number().integer().positive().required()
  }
});