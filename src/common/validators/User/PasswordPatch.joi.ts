
import Joi from "joi";


class PasswordPatchValidator {
    static schema = Joi.object({
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
    PasswordPatchValidator
}