import Joi from "joi";

class UserExternalCodeValidator {
    static schema = Joi.object({
        code: Joi.string()
            .required()
            .messages({
                "any.required": "User code not found",
                "string.empty": "User code not found"
            })
    })

}

export {
    UserExternalCodeValidator
}