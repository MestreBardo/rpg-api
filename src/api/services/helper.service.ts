import {
    compare,
    hash
} from "bcrypt"


import {
    sign
} from "jsonwebtoken";

const encryptString = (
    stringToEncrypt: string,
    salts: number = +`${process.env.SALT}`) => {
    return hash(stringToEncrypt, salts);
}

const compareEncryptString = (
    stringToBeComapared: string,
    encryptedString: string
) => {
    return compare(stringToBeComapared, encryptedString)
}

const generateToken = async (payload: any, fields: string[]) => {
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



export {
    encryptString,
    compareEncryptString,
    generateToken
}