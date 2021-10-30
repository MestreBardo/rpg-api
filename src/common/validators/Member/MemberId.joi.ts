import Joi from "joi";
import { JoiObjectId } from "../../../helpers/Validator";


class MemberIdValidator {
    static schema = Joi.object({
        memberId: JoiObjectId()

    }).unknown(true);
}

export {
    MemberIdValidator
}