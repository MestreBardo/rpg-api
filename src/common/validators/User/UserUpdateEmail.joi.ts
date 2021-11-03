import Joi from "joi";


class UserUpdateEmailValidator {
    static schema = Joi.object({

        email: Joi.string()
            .email()
            .required()
            .messages({
                "any.required": "Email not found",
                "string.empty": "Email field is empty",
                "string.email": "Email is invalid"
            }),
        confirmationPassword: Joi.string()
            .required()
            .messages({
                "any.required": "Confirmation password field not found",
                "string.empty": "Confirmation password field is empty"
            }),


    })
    .unknown(true)
}

export {
    UserUpdateEmailValidator
}