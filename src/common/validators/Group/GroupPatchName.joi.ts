import Joi from "joi";

class GroupPatchNameValidator {
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

    }).unknown(true);
}

export {
    GroupPatchNameValidator
}