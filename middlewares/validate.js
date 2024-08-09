export default (schema, target) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[target], { abortEarly: false });
        const fields = {};

        if (!error) {
            next();
        }
        error.details.forEach((detail) => {
            const key = detail.context.key;
            fields[key] = detail.message;
        });
        const hasErrors = Object.keys(fields).length > 0;

        if (hasErrors) {
            return res.status(422).json({
                message: 'Validation error',
                fields,
            });
        }
    };
};