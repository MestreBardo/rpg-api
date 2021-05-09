import {
    compare,
    hash
} from "bcrypt"


import {
    sign
} from "jsonwebtoken";
import ErrorWithMessages from "../common/errorWithMessages";

export const encryptString = (
    stringToEncrypt: string,
    salts: number = +`${process.env.SALT}`) => {
    return hash(stringToEncrypt, salts);
}

export const compareEncryptString = (
    stringToBeComapared: string,
    encryptedString: string
) => {
    return compare(stringToBeComapared, encryptedString)
}

export const checkFieldExistence = (objectToCheck: any, fields: string[]) => {
    const errors = [];
    for(const field of fields) {
        if (!objectToCheck[field]) 
            errors.push(`${field} is not defined on body`);
    }

    if(errors.length) 
        throw new ErrorWithMessages("unprocessableEntity", errors)
}

export const generateToken = async (payload: any, fields: string[]) => {
    const objectToTokenize: any = {};

    for await (const field of fields) {
        if (payload[field])
            objectToTokenize[field] = payload[field]
    }

    return `Bearer ${
        sign(objectToTokenize,
            `${process.env.TOKEN}`,
            {
                expiresIn: '1w'
            }
        )
    }`
}
