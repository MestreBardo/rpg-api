import ServiceResponse from '../common/serviceResponse';
import GroupModel from '../components/groups/group.model';
import { GroupDocumentInterface } from './../interfaces/group.interface';
export const createGroup = async (group: GroupDocumentInterface) => {
    const newGroup = new GroupModel(group);
    const errors = await newGroup.validateData();

    if (errors.length) 

        return new ServiceResponse("notFound", errors)

    const existGroup = await GroupModel.findOne({name: group.name}).select('_id');

    if (existGroup) 
        return new ServiceResponse("conflict", ["Name group already exists"]);

    await group.save();

    return new ServiceResponse<GroupDocumentInterface>(null, group)
}