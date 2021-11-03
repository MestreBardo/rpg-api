import { GroupUpdateName } from "../../../../src/core/handles/Group/GroupUpdateName.handle";
import { GroupRepository } from "../../../../src/database/repositories/Group.repository";

// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();



describe('Test GroupUpdateNameHandle', () => {
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

        GroupRepository.patchName = jest.fn().mockReturnValue({
            name: "Group changed"
        });

        req = {
            group: {
                name: "group"
            },
            body: {
                name: "member"
            }
        }
    });

    test('Should return group changed', async () => {

       
        await GroupUpdateName.handle(
            req,
            res,
            next
        )

        expect(res.response.payload.name).toBe("Group changed");
        expect(res.code).toBe(200);
    });


    test("Should return 'Server have a error to process the request!'", async () => {
        delete req.group;

        await GroupUpdateName.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test("Should return 'Server have a error to process the request!'", async () => {
        delete req.body.name;

        await GroupUpdateName.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test("Should return 'Something went wrong'", async () => {


        GroupRepository.patchName = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
            
        });

        await GroupUpdateName.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });
   
})