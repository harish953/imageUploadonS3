const Joi = require('@hapi/joi');

const signupSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
    signupSchema,
    loginSchema,
};