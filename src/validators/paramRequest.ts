import Joi from 'joi';

const paramValidationSchema = Joi
    .object()
    .keys({
        id: Joi.number().required().label('Id')
    })

const paramValidationWorkspaceIdSchema = Joi
    .object()
    .keys({
        workspaceId: Joi.number().required().label('workspaceId')
    })

export {
    paramValidationSchema,
    paramValidationWorkspaceIdSchema
}