import { hash } from 'bcrypt';
import { User } from './../../common/entities/User.entity';
import { UserMongoose } from "../models/User.mongoose"

class UserRepository {

    static async addGroup(userId: string): Promise<User> {
        const user = await UserMongoose.model.findById(
            userId
        )
        user.groupCount++;
        await user.save();

        return user.toJSON();
    }

    static async removeGroup(userId: string): Promise<User> {
        const user = await UserMongoose.model.findById(
            userId
        )
        user.groupCount--;
        await user.save();

        return user.toJSON();
    }
    static async findByUsernameOrEmail(username: string, email: string, lean: boolean = false): Promise<User> {
        username = username.toLowerCase();
        email = email.toLowerCase(); 
        const user = await UserMongoose.model.findOne(
            {
                $or: [
                    {username},
                    {email}
                ]
            }
        )

        if (lean && user)
            return user.toJSON();

        return user;
    }

    static async findByUsernameOrEmailOtherId(id: string,username: string, email: string, lean: boolean = false): Promise<User> {
        username = username.toLowerCase();
        email = email.toLowerCase(); 
        const user = await UserMongoose.model.findOne(
            {
                _id: {
                    $ne: id
                },
                $or: [
                    {username},
                    {email}
                ]
            }
        )

        if (lean && user)
            return user.toJSON();

        return user;
    }

    static async findOneById(id: string, lean: boolean = false): Promise<User> {
        const user = await UserMongoose.model.findById(
            id
        );
        if (lean && user)
            return user.toJSON();

        return user;
    }

    static async updateOneById(id: string, user: any): Promise<User> {
        const {
            name,
            surname,
            birthday,
            city,
            country,
            gender
        } = user;

        const userUpdated = await UserMongoose.model.findById(
            id
        );

        userUpdated.name = name || userUpdated.name;
        userUpdated.surname = surname || userUpdated.surname;
        userUpdated.birthday = birthday || userUpdated.birthday;
        userUpdated.city = city || userUpdated.city;
        userUpdated.country = country || userUpdated.country;
        userUpdated.gender = gender || userUpdated.gender;

        await userUpdated.save();

        return userUpdated.toJSON();

    }

    static async updateUsernameById(id: string, user: any): Promise<User> {
        const { username } = user;
        const userUpdated = await UserMongoose.model.findById(
            id
        );

        userUpdated.username = username;

        await userUpdated.save();

        return userUpdated.toJSON();

    }


    static async updateEmailById(id: string, user: any): Promise<User> {
        const { email } = user;
        const userUpdated = await UserMongoose.model.findById(
            id
        );

        userUpdated.email = email;

        await userUpdated.save();

        return userUpdated.toJSON();

    }


    static async updatePasswordById(id: string, user: any): Promise<User> {
        const { password } = user;
        const hashedPassword = await hash(password, 10);
        const userUpdated = await UserMongoose.model.findById(
            id
        );

        userUpdated.password = hashedPassword;

        await userUpdated.save();

        return userUpdated.toJSON();

    }


    static async findByExternalAccess(source: string, id: string, lean: boolean = false): Promise<User> {
        const user = await UserMongoose.model.findOne(
            {
                "external.source": source,
                "external.id": id
            }
        )

        if (lean && user)
            return user.toJSON();

        return user;
    }

    static async createOne(user: User): Promise<User> {
        const newUser = await UserMongoose.model.create(user);
        await newUser.save();

        return newUser.toJSON();
        
    }
}

export {
    UserRepository
}