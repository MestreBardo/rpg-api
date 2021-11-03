import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { Types } from "mongoose";
import { HttpStatus } from "../common/constants/HttpStatus.enum";
import { ValidationSource } from "../common/enums/ValidationSource.enum";
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
        source: ValidationSource = ValidationSource.BODY 
    ) {
        return function (req: Request, res: Response, next: NextFunction) {
            try {
                
                if(!req[source])
                    return HttpResponse.create(
                        HttpStatus.badRequest,
                        req,
                        res,
                        "Source is not present on request!"
                    )

                const { error } = joiSchema.validate(
                    req[source]
                );

                if(!error) 
                    return next();
                
                const { details } = error;


                return HttpResponse.create(
                    HttpStatus.badRequest,
                    req,
                    res,
                    details.map(detail => detail.message)
                )
            } 
            catch (error: any) {
                
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    error.message
                )
            }
        }
        
        
    }
}

export {
    Validator,
    JoiObjectId,
    JoiAuthBearer
}