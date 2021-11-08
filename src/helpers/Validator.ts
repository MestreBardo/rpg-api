import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { Types } from "mongoose";
import { HttpStatus } from "../common/constants/HttpStatus.enum";
import { ValidationSource } from "../common/enums/ValidationSource.enum";
import { HttpError } from "../common/responses/HttpError";
import { HttpResponse } from "../common/responses/HttpResponse.factory";


const JoiObjectId = () =>
  Joi.string().custom((value: string, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error('any.invalid');
    return value;
  }, 'Object Id is Invalid');


const JoiAuthBearer = () =>
  Joi.string().custom((value: string, helpers) => {
    if (!value) return helpers.error('any.invalid');
    if (!value.startsWith('Bearer ')) return helpers.error('any.invalid');
    if (!value.split(' ')[1]) return helpers.error('any.invalid');
    return value;
}, 'Authorization token is not present or is bad formmated');

class Validator {


    
    static validate(
        joiSchema: ObjectSchema,
        objectToValidade: any
    ) {

        const { error } = joiSchema.validate(
            objectToValidade,
            { abortEarly: false }
        );

        if(!error) 
            return;
        
        const { details } = error;

        throw new HttpError(
            HttpStatus.BADREQUEST,
            details.map(
                (error: any) => error.message
            ).join(', ')
        );
        
    }
}

export {
    Validator,
    JoiObjectId,
    JoiAuthBearer
}