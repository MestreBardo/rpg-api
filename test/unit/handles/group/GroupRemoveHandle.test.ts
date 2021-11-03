import { GroupRemove } from "../../../../src/core/handles/Group/GroupRemove.handle";
import { GroupRepository } from "../../../../src/database/repositories/Group.repository";
import { MemberRepository } from "../../../../src/database/repositories/Member.repository";
import { UserRepository } from "../../../../src/database/repositories/User.repository";


// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();



describe('Test GroupRemoveHandle', () => {
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

        MemberRepository.removeUser = jest.fn();
        GroupRepository.removeMember = jest.fn();
        UserRepository.removeGroup = jest.fn();

        req = {
            group: {
                name: "group"
            },
            otherMember: {
                name: "member"
            }
        }
    });

    test('Should return "User removed from group"', async () => {

       
        await GroupRemove.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("User removed from group");
        expect(res.code).toBe(200);
    });


    test("Should return 'Server have a error to process the request!'", async () => {
        delete req.group;

        await GroupRemove.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test("Should return 'Server have a error to process the request!'", async () => {
        delete req.otherMember;

        await GroupRemove.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test("Should return 'Something went wrong'", async () => {


        MemberRepository.removeUser = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
            
        });

        await GroupRemove.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });

    test("Should return 'Something went wrong'", async () => {


        GroupRepository.removeMember = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
            
        });

        await GroupRemove.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });

    test("Should return 'Something went wrong'", async () => {


        UserRepository.removeGroup = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
            
        });

        await GroupRemove.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });

   
})