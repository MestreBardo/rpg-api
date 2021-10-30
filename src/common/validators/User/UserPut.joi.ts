import Joi from "joi";


class UserPutValidator {
    static schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .messages({
                "any.required": "Name not found",
                "string.empty": "Name field is empty",
                "string.min": "Name has less than 3 characters",
                "string.max": "Name has more than 30 characters",
            }),
        surname: Joi.string()
            .min(3)
            .max(50)
            .messages({
                "any.required": "Surname not found",
                "string.empty": "Surname field is empty",
                "string.min": "Surname has less than 3 characters",
                "string.max": "Surname has more than 50 characters",
            }),


        confirmationPassword: Joi.string()
            .required()
            .min(6)
            .max(30)
            .messages({
                "any.required": "Confirmation password field not found",
                "string.empty": "Confirmation password field is empty",
                "string.min": "Confirmation password has less than 3 characters",
                "string.max": "Confirmation password has more than 30 characters",
            }),
        country: Joi.string()
            .messages({
                "any.required": "Country not found",
                "string.empty": "Country field is empty",
            }),
        city: Joi.string()
            .messages({
                "any.required": "City not found",
                "string.empty": "City field is empty",
            }),
        gender: Joi.string()
            .messages({
                "any.required": "Gender not found",
                "string.empty": "Gender field is empty",
            }),

        birthday: Joi.date()
            .messages({
                "any.required": "Birthday field is empty",
                "date.base": "Birthday must be a valid date"
            })

    })
    .unknown(true)
}

export {
    UserPutValidator
}