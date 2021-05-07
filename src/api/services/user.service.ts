import userModel from "../components/users/user.model";

export const addUserToGroup = async (id: string): Promise<void> => {
    await userModel.findByIdAndUpdate(id, {
        $inc: {
            groupCount: 1
        }
    });
}