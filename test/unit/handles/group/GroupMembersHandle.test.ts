import { GroupMembers } from "../../../../src/core/handles/Group/GroupMembers.handle";
import { GroupRepository } from "../../../../src/database/repositories/Group.repository"
import { MemberRepository } from "../../../../src/database/repositories/Member.repository";
import { UserRepository } from "../../../../src/database/repositories/User.repository";



// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();



describe('Test GroupMembersHandle', () => {
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

        req = {
            user: {
                _id: "4545454545",
                username: "mestrebarde",
                email: "mestre@mestre.com"
            },
            group: {
                name: "group"
            },
            query: {
                page: 1
            }
        };

        MemberRepository.findUserByGroup = jest.fn().mockReturnValue([
            {
                name: "one"
            }, 
            {
                name: "two"
            }
        ]);
    });

    test('Should return Members', async () => {

        await GroupMembers.handle(
            req,
            res,
            next
        )

        console.log(res.response);

        expect(res.response.payload[0].name).toBe("one");
        expect(res.code).toBe(200);
    });

  

    test('Should return "Server have a error to process the request!"', async () => {
        delete req.group;

        await GroupMembers.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test('Should return "Something Went Wrong"', async () => {

        MemberRepository.findUserByGroup = jest.fn().mockImplementation(() => {
            throw new Error("Something Went Wrong");
        });

        await GroupMembers.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something Went Wrong");
        expect(res.code).toBe(500);
    });


})