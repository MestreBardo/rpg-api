import { GroupFindMany } from "../../../../src/core/handles/Group/GroupFindMany.handle";
import { GroupRepository } from "../../../../src/database/repositories/Group.repository"

// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();



describe('Test GroupFindManyHandle', () => {
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

    test('Should return groups', async () => {
        req.query = {
        
        }
        GroupRepository.findMany = jest.fn().mockReturnValue([
            {
                name: "group1"
            },
            {
                name: "group2"
            }
        ]);

       
        await GroupFindMany.handle(
            req,
            res,
            next
        )

        expect(res.response.payload[0].name).toBe("group1");
        expect(res.code).toBe(200);
    });

  

    test('Should return "Something went wrong on group find"', async () => {
        req.query = {
        
        }
        GroupRepository.findMany = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong on group find");
        });

       
        await GroupFindMany.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong on group find");
        expect(res.code).toBe(500);
    });
})