import Joi from 'joi';

 export const workspaceUserPOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    inviteId: Joi.number()
      .min(1)
      .label('inviteId => userId')
      .required(),  
    workspaceId: Joi.number()
      .min(1)
      .label('workspaceId')
      .required(),  
   });

