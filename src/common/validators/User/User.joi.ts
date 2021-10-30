import Joi from "joi";

class UserValidator {
    static schema = Joi.object({
        name: Joi.string()
            .required()
            .min(3)
            .max(30)
            .messages({
                "any.required": "Name not found",
                "string.empty": "Name field is empty",
                "string.min": "Name has less than 3 characters",
                "string.max": "Name has more than 30 characters",
            }),
        surname: Joi.string()
            .required()
            .min(3)
            .max(50)
            .messages({
                "any.required": "Surname not found",
                "string.empty": "Surname field is empty",
                "string.min": "Surname has less than 3 characters",
                "string.max": "Surname has more than 50 characters",
            }),
        username: Joi.string()
            .pattern(/^[A-z0-9_-]+$/)
            .min(3)
            .max(30)
            .required()
            .messages({
                "any.required": "Username not found",
                "string.empty": "Username field is empty",
                "string.pattern.base": "Username not accept space and special characters",
                "string.min": "Username has less than 3 characters",
                "string.max": "Username has more than 30 characters",
            }),

        password: Joi.string()
            .min(6)
            .max(30)
            .required()
            .messages({
                "any.required": "Password not found",
                "string.empty": "Password field is empty",
                "string.min": "Password has less than 3 characters",
                "string.max": "Password has more than 30 characters",
            }),
        confirmationPassword: Joi.string()
            .min(6)
            .max(30)
            .required()
            .valid(Joi.ref("password"))
            .messages({
                "any.only": "Confirmation password don't match password",
                "string.empty": "Confirmation password field is empty",
                "string.min": "Confirmation password has less than 3 characters",
                "string.max": "Confirmation password has more than 30 characters",
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                "any.required": "Email not found",
                "string.empty": "Email field is empty",
                "string.email": "Email is incorrect"
            }),
        country: Joi.string()
            .required()
            .messages({
                "any.required": "Country not found",
                "string.empty": "Country field is empty",
            }),
        city: Joi.string()
            .required()
            .messages({
                "any.required": "City not found",
                "string.empty": "City field is empty",
            }),
        gender: Joi.string()
            .required()
            .messages({
                "any.required": "Gender not found",
                "string.empty": "Gender field is empty",
            }),
        birthday: Joi.date()
            .required()
            .messages({
                "any.required": "Birthday field is empty",
                "date.base": "Birthday must be a valid date"
            })
            
            
    })
    .options({
        abortEarly: false
    })

}

export {
    UserValidator
}