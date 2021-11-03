import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";
import { GroupFind } from "../../../../src/core/handles/Group/GroupFind.handle";
import { GroupRepository } from "../../../../src/database/repositories/Group.repository"
// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();
let mockStaticF = jest.fn().mockReturnValue('worked')



describe('Test GroupFindHandle', () => {
    beforeAll(() => {
        res = {
            code: 0,
            response: "",
            status: function(code) {
                this.code = code;
                return this;
            },
            send: function(response) {
                this.response = response;
            }
        };

        req = {
        };
    });
    beforeEach(() => {
        mockStaticF = jest.fn().mockReturnValue('worked')
        next = jest.fn();
    });

    test('Should append request group', async () => {
        req.params = {
            groupId: "618006e0bd56c9b01f5bcc1e"
        }
        GroupRepository.findById = mockStaticF;

       
        await GroupFind.handle(
            ValidationSource.PARAMS
        )(
            req,
            res,
            next
        )

        expect(req.group).toBe("worked");
        expect(next).toBeCalled();
    });

    test('Should return "Server have a error to process the request"', async () => {
        req.params = {
        }
        GroupRepository.findById = mockStaticF;

       
        await GroupFind.handle(
            ValidationSource.PARAMS
        )(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test('Should return "Group not exist"', async () => {
        req.params = {
            groupId: "618006e0bd56c9b01f5bcc1e"
        }
        GroupRepository.findById = jest.fn().mockReturnValue(null);

       
        await GroupFind.handle(
            ValidationSource.PARAMS
        )(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Group not exist");
        expect(res.code).toBe(404);
    });


    test('Should return 500', async () => {
        req.params = {
            groupId: "618006e0bd56c9b01f5bcc1e"
        }
        GroupRepository.findById = jest.fn().mockImplementation(() => {
            throw new Error("Expected message");
        });

       
        await GroupFind.handle(
            ValidationSource.PARAMS
        )(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Expected message");
        expect(res.code).toBe(500);
    });
})