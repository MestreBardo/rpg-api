import Joi from "joi";
import { JoiObjectId } from "../../../helpers/Validator";

class CampaignUpdateNameValidator {
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
        groupId: JoiObjectId()
            .required()
            .messages({
                "any.invalid": "This id is not valid",
                "any.required": "Id is required!",
                "string.empty": "Id field is empty"
            }),

    }).unknown(true);
}

export {
    CampaignUpdateNameValidator
}