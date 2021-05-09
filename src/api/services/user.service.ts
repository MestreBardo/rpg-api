import ErrorWithMessages from "../common/errorWithMessages";
import UserModel from "../components/users/user.model";

export const addUserToGroup = async (id: string): Promise<void> => {
    await UserModel.findByIdAndUpdate(id, {
        $inc: {
            groupCount: 1
        }
    }, {new: true});
}

export const checkUserUniqueness = async (value: any, id: string, field: string) => {
    const userInDatabase = await UserModel.findOne({[field]: value, _id: {$ne: id}});
    if (userInDatabase)
        throw new ErrorWithMessages("conflict", ["Username alrealdy taken"]);

}