import { GroupFindOne } from "../../../../src/core/handles/Group/GroupFindOne.handle";
import { GroupRepository } from "../../../../src/database/repositories/Group.repository"

// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();



describe('Test GroupFindOneHandle', () => {
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
        next = jest.fn();
    });

    test('Should return the group', async () => {
        req.params = {
            groupId: "54454848884"
        }
        GroupRepository.findById = jest.fn().mockReturnValue({
            name: "group1"
        });

       
        await GroupFindOne.handle(
            req,
            res,
            next
        )

        expect(res.response.payload.name).toBe("group1");
        expect(res.code).toBe(200);
    });

  

    test('Should return "Group not exist"', async () => {
        req.params = {
            groupId: "54454848884"
        }

        GroupRepository.findById = jest.fn().mockReturnValue(null);

        await GroupFindOne.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Group not exist");
        expect(res.code).toBe(404);
    });

    test('Should return "Server have a error to process the request!"', async () => {
        req.params = {
        }

        GroupRepository.findById = jest.fn().mockReturnValue(null);

        await GroupFindOne.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test('Should return "Something went wrong"', async () => {
        req.params = {
            groupId: "sdsdsd"
        }

        GroupRepository.findById = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
            
        });

        await GroupFindOne.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });
})