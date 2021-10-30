import Joi from "joi";
import { JoiObjectId } from "../../../helpers/Validator";


class UserIdValidator {
    static schema = Joi.object({
        userId: JoiObjectId()

    }).unknown(true);
}

export {
    UserIdValidator
}