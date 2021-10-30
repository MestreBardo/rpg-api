

import Joi from "joi";


class UsernamePatchValidator {
    static schema = Joi.object({
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

        confirmationPassword: Joi.string()
            .required()
            .min(6)
            .max(30)
            .messages({
                "any.required": "Confirmation password field not found",
                "string.empty": "Confirmation password field is empty",
                "string.min": "Confirmation password has less than 3 characters",
                "string.max": "Confirmation password has more than 30 characters",
            }),


    })
    .unknown(true)
}

export {
    UsernamePatchValidator
}