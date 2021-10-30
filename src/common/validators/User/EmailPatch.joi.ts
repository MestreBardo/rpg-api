

import Joi from "joi";


class EmailPatchValidator {
    static schema = Joi.object({

        email: Joi.string()
            .email()
            .required()
            .messages({
                "any.required": "Email not found",
                "string.empty": "Email field is empty",
                "string.email": "Email is incorrect"
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
    EmailPatchValidator
}