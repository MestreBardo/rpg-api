import Joi from "joi";
import { JoiAuthBearer } from "../../../helpers/Validator";


class JwtValidator {
    static schema = Joi.object({
        authorization: JoiAuthBearer()
        .required()
        .messages({
            "any.invalid": "authorization is invalid",
            "string.empty": "authorization can't be empty",
            "any.required": "authorization is not present!"
        })

    }).unknown(true)
}

export {
    JwtValidator
}