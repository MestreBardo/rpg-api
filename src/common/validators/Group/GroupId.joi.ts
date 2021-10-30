import Joi from "joi";
import { JoiObjectId } from "../../../helpers/Validator";


class GroupIdValidator {
    static schema = Joi.object({
        groupId: JoiObjectId()

    }).unknown(true);
}

export {
    GroupIdValidator
}