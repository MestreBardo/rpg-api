import Joi from "joi";
import { JoiObjectId } from "../../../helpers/Validator";


class UserIdValidator {
    static schema = Joi.object({
        userId: JoiObjectId()
        .required()
        .messages({
            "any.invalid": "This id is not valid",
            "any.required": "Id is required!",
            "string.empty": "Id field is empty"
        })

    }).unknown(true);
}

export {
    UserIdValidator
}