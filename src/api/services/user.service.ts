import { UserDocumentInterface } from './../interfaces/user.interface';
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import ErrorWithMessages from "../common/errorWithMessages";
import UserModel from "../components/users/user.model";

export const login = async (receivedData: any) => {
    const userInDatabase = await UserModel.getByEmailOrUsername(receivedData.login);

    if(!userInDatabase)
        throw new ErrorWithMessages("", ["teste"]);

    const passwordMatch = await compare(receivedData.password, userInDatabase.password);

    if(!passwordMatch)
        throw new ErrorWithMessages("", ["teste"]);
    
    if(!userInDatabase.active)
        throw new ErrorWithMessages("", ["teste"]);

    const {_id, name, surname, city, country, birthday, gender, email} = userInDatabase;

    return new Promise((resolve, reject) => {
        sign(
            {_id, name, surname, city, country, birthday, gender, email}, 
            process.env.TOKEN,
            { expiresIn: '3d' },
            (err, token) => {
                if(err)
                    reject(err);
                resolve(`Bearer ${token}`)
            }
        )
    })
      
}

export const register = async (receivedData: UserDocumentInterface) => {
    const userToRegister = new UserModel(receivedData);
    await new Promise((resolve, reject) => {
        userToRegister.validate(async (errors) => {
            if(errors) {
                let errorsReturn = [];
                const errorMessageSplited = errors.message.split(',');
                for await(const error of errorMessageSplited) {
                    const errorSplited = error.split(':');
                    const message = errorSplited[errorSplited.length - 1].trim();
                    errorsReturn.push(message);
                    
                }
                console.log(errorsReturn);
                reject(new ErrorWithMessages("conflict", [...errorsReturn]))
            }
            resolve("");
        })
    })
    console.log("help");

    await userToRegister.save();
    console.log("helpu");

    const {_id, name, surname, city, country, birthday, gender, email} = userToRegister;

    return new Promise((resolve, reject) => {
        sign(
            {_id, name, surname, city, country, birthday, gender, email}, 
            process.env.TOKEN,
            { expiresIn: '3d' },
            (err, token) => {
                if(err)
                    reject(err);
                resolve(`Bearer ${token}`)
            }
        )
    })
}

export const addUserToGroup = async (id: string): Promise<void> => {
    await UserModel.findByIdAndUpdate(id, {
        $inc: {
            groupCount: 1
        }
    }, {new: true});
}

// export const checkUserUniqueness = async (email: any, username: any, id: string) => {
//     const userInDatabase = await getUserByEmailOrUsername(email, username);
//     if (userInDatabase._id !== id)
//         throw new ErrorWithMessages("conflict", ["Username alrealdy taken"]);

// }

// export const checkUserDuplicity = async (email: any, username: any) => {
//     co
// }

// export const getUserByEmailOrUsername = async (email:string = "", username:string = "") => {
//     const user = await UserModel.findOne({
//         $or: [{
//             email
//         }, {
//             username
//         }]
//     }).lean();

//     if(!user)
//         throw new ErrorWithMessages("")
    
//     return user;
// }



// export const compareEncryptPassword = async (
//     passwordToBeCompared: string,
//     encryptedPassword: string
// ) => {
//     const result = await compare(passwordToBeCompared, encryptedPassword);
//     if (!result)
//         throw new ErrorWithMessages("unauthorized", ["password not match"])
// }
