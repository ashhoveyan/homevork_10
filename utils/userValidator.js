import md5 from 'md5';
import Joi from 'joi'


const registerSchema = Joi.object({
    name: Joi.string().min(3).max(55).required(),
    email: Joi.string().email({minDomainSegments: 2}).required(),
    password: Joi.string().min(6).max(20).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2}).required(),
    password: Joi.string().required(),
})

const userProfile = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).max(30).required(),
})

const validate = {
    register: (body) => {
        const {error} = registerSchema.validate(body, { abortEarly: false });
        return processValidation(error);
    },
    login: (body) => {
        const {error} = loginSchema.validate(body, { abortEarly: false });
        return processValidation(error);
    },
    getProfile: (body) => {
        const {error} = userProfile.validate(body, { abortEarly: false });
        return processValidation(error);
    }
}


const processValidation = (error) => {
    const fields = {};
    if (error) {
        error.details.forEach(detail => {
            fields[detail.path[0]] = detail.message;
        });
    }
    return {
        fields,
        haveErrors: !!error
    };
};

export default validate