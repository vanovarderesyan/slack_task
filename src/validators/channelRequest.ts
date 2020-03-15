import Joi from 'joi';

 const channelPOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string()
      .min(4)
      .max(100)
      .label('Name')
      .required(),
    workspaceId: Joi.number()
      .min(1)
      .label('workspaceId')
      .required(),  
   });

   const channelPUTchema = Joi.object()
   .options({ abortEarly: false })
   .keys({
     name: Joi.string()
       .min(4)
       .max(100)
       .label('Name')
       .required() 
    });
   export {
       channelPOSTSchema,
       channelPUTchema

   }