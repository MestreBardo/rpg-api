import Joi from "joi";
import { JoiAuthBearer } from "../../../helpers/Validator";


class JwtValidator {
    static schema = Joi.object({
        authorization: JoiAuthBearer()

    }).unknown(true)
}

export {
    JwtValidator
}