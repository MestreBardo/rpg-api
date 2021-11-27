import { hash } from 'bcrypt';
import { User } from './../../common/entities/User.entity';
import { UserMongoose } from "../models/User.mongoose"
import { networkmanagement } from 'googleapis/build/src/apis/networkmanagement';

class UserRepository {
    static async addCampaign(id: string): Promise<void> {
        await UserMongoose.model.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $inc: {
                    campaingCount: 1
                }
            }
        );
    }

    static async removeCampaign(id: string): Promise<void> {
        await UserMongoose.model.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $inc: {
                    campaingCount: -1
                }
            }
        );
    }

    static async addGroup(id: string): Promise<User> {
        const user = await UserMongoose.model.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $inc: {
                    groupCount: 1
                }
            }
        ).lean();

        return user;

    }

    static async removeGroup(id: string): Promise<User> {
        const user = await UserMongoose.model.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $inc: {
                    groupCount: -1
                }
            }
        ).lean();

        return user;
    }
    static async findByUsernameOrEmail(username: string, email: string): Promise<User> {
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
        .lean();
        
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

    static async findOneById(id: string): Promise<User> {
        const user = await UserMongoose.model.findById(
            id
        )
        .lean();

        return user;
    }

    static async updateOneById(id: string, user: any): Promise<User> {

        Object.keys(user).forEach(
            (key: any) => {
                if(!user[key])
                    delete user[key];
            }
        )

        const userUpdated = await UserMongoose.model.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    ...user
                }
            },
            {
                new: true
            }
        )
        .select("-password")
        .lean();

        return userUpdated;

    }

    static async updateUsernameById(id: string, username: string): Promise<User> {
        const updatedUser = await UserMongoose.model.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    username: username
                }
            },
            {
                new: true
            }
        )
        .select("-password")
        .lean();

        return updatedUser;

    }


    static async updateEmailById(id: string, email: string): Promise<User> {
        const updatedUser = await UserMongoose.model.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    email: email
                }
            },
            {
                new: true
            }
        )
        .select("-password")
        .lean();

        return updatedUser;

    }


    static async updatePasswordById(id: string, password: string): Promise<User> {
        const hashedPassword = await hash(password, 10);
        const updatedUser = await UserMongoose.model.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    password: hashedPassword
                }
            },
            {
                new: true
            }
        )
        .select("-password")
        .lean();


        return updatedUser;

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
        const newUser = new UserMongoose.model(user);
        await newUser.save();

        return newUser.toJSON();
        
    }
}

export {
    UserRepository
}