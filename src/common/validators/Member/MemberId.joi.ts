import Joi from "joi";
import { JoiObjectId } from "../../../helpers/Validator";


class MemberIdValidator {
    static schema = Joi.object({
        memberId: JoiObjectId()
        .required()
        .messages({
            "any.invalid": "This id is not valid",
            "any.required": "Id is required!",
            "string.empty": "Id field is empty"
        })

    }).unknown(true);
}

export {
    MemberIdValidator
}