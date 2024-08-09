import Joi from "joi";

export default{
    createTask: Joi.object({
        userId: Joi.string().min(1).required(),
        title: Joi.string().min(3).alphanum().max(50).required(),
        description: Joi.string().min(1).max(200).required(),
    }),
    getTasksList: Joi.object({
        userId: Joi.string().min(1)
    }),
    getTask: Joi.object({
        id: Joi.string().min(1).required()
    }),
    updateTask: Joi.object({
        title: Joi.string().min(3).alphanum().max(50),
        description: Joi.string().min(1).max(200),
        id: Joi.string().min(1).required(),
    }),
    deleteTask: Joi.object({
        id: Joi.string().min(1).required(),
    }),
}