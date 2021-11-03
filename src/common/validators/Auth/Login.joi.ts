import Joi from "joi";

class LoginValidator {
    static schema = Joi.object({
        login: Joi.string()
            .required()
            .messages({
                "any.required": "Login not found",
                "string.empty": "Login field is empty"
            }),

        password: Joi.string()
            .required()
            .messages({
                "any.required": "Password not found",
                "string.empty": "Password field is empty"
            }),

    })
    .options({
        abortEarly: false
    })
}

export {
    LoginValidator
}