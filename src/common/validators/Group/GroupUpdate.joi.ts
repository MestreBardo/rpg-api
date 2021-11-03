import Joi from "joi";

class GroupUpdateValidator {
    static schema = Joi.object({
        description: Joi.string(),

        isPublic: Joi.bool()
            .messages({
                "any.required": "isPublic not found",
            }),
            
            
    })
    .options({
        abortEarly: false
    })
    .unknown(true)

}

export {
    GroupUpdateValidator
}