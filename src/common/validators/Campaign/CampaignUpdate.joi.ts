import Joi from "joi";

class CampaignUpdateValidator {
    static schema = Joi.object({
        description: Joi.string(),
        system: Joi.string()
            
    })
    .options({
        abortEarly: false
    })
    .unknown(true)

}

export {
    CampaignUpdateValidator
}