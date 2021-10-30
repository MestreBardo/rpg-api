import Joi from "joi";
import { JoiObjectId } from "../../../helpers/Validator";

class GroupValidator {
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
        description: Joi.string(),
        system: Joi.string()
            .required()
            .messages({
                "any.required": "System not found",
                "string.empty": "System field is empty",
            }),


        isPublic: Joi.bool()
            .required()
            .messages({
                "any.required": "isPublic not found",
            }),
            
            
    })
    .options({
        abortEarly: false
    })

}

export {
    GroupValidator
}