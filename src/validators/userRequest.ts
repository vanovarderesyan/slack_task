import Joi from 'joi';
const userPOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string()
      .max(100)
      .label('Name')
      .required(),
    email: Joi.string()
      .min(10)
      .max(100)
      .label('Email')
      .required(),
    password: Joi.string()
      .min(6)
      .max(100)
      .label('Password')
      .required(),
    displayName: Joi.string()
    .alphanum()
      .required()
      .label('displayName')

  });

const userPUTchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string()
      .max(100)
      .label('Name')
      .required(),
    email: Joi.string()
      .min(10)
      .max(100)
      .label('Email')
      .required(),
    displayName: Joi.string()
    .alphanum()
      .required()
   
      .label('displayName')

  });
export {
  userPOSTSchema,
  userPUTchema
}