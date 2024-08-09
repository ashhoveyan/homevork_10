import Joi from 'joi';

export default {
    register: Joi.object({
        firstName: Joi.string().trim().min(1).max(30).required(),
        lastName: Joi.string().trim().min(1).max(30).required(),
        email: Joi.string().trim().email({minDomainSegments: 2}).required(),
        password: Joi.string().trim().min(8).max(32).required()
    }),
    login: Joi.object({
        email: Joi.string().trim().email({minDomainSegments: 2}).required(),
        password: Joi.string().trim().min(8).max(32).required()
    }),
    getUserProfile: Joi.object({
        id: Joi.number().integer().positive().required()
    }),
    updateUserProfile: Joi.object({
        id: Joi.number().integer().positive().required(),
        firstName: Joi.string().trim().min(1).max(30).required(),
        lastName: Joi.string().trim().min(1).max(30).required(),
        email: Joi.string().trim().email({minDomainSegments: 2}).required(),
        password: Joi.string().trim().min(8).max(32).required()
    }),
    deleteProfile: Joi.object({
        id: Joi.number().integer().positive().required(),
        password: Joi.string().trim().min(8).max(32).required(),
        email: Joi.string().trim().email({minDomainSegments: 2}).required(),
    })
}