import ErrorResponse from '../common/errorResponse';
import ServiceResponse from '../common/serviceResponse';
import GroupModel from '../components/groups/group.model';
import { GroupDocumentInterface } from './../interfaces/group.interface';
export const createGroup = async (value: GroupDocumentInterface): Promise<ServiceResponse<GroupDocumentInterface>> => {
    const group = new GroupModel(value);
    const errors = await group.validateData();

    if (errors.length) {
        const errorResponse = new ErrorResponse("notFound", errors)
        return new ServiceResponse(errorResponse, null)
    } 
        

    const existGroup = await GroupModel.findOne({name: group.name}).select('_id');

    if (existGroup) {
        const errorResponse = new ErrorResponse("conflict", ["Name group already exists"]);
        return new ServiceResponse(errorResponse, null)
    }

    await group.save();

    return new ServiceResponse<GroupDocumentInterface>(null, group)
}
