import { GroupLeave } from "../../../../src/core/handles/Group/GroupLeave.handle";
import { GroupRepository } from "../../../../src/database/repositories/Group.repository"
import { MemberRepository } from "../../../../src/database/repositories/Member.repository";
import { UserRepository } from "../../../../src/database/repositories/User.repository";


// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();



describe('Test GroupLeaveHandle', () => {
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
            user: {
                _id: "4545454545",
                username: "mestrebarde",
                email: "mestre@mestre.com"
            },
            group: {
                name: "grupo"
            },
            member: {
                _id: "64646464646"
            }
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
                name: "group1"
            },
            member: {
                _id: "64646464646"
            }
        };

        MemberRepository.removeMemberById = jest.fn();

        UserRepository.removeGroup = jest.fn();

        GroupRepository.removeMember = jest.fn();
    });

    test('Should return "Group leave with success!"', async () => {

        await GroupLeave.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Group leave with success!");
        expect(res.code).toBe(200);
    });

  

    test('Should return "Server have a error to process the request!"', async () => {
        delete req.user;

        await GroupLeave.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test('Should return "Server have a error to process the request!"', async () => {
        delete req.group;

        await GroupLeave.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test('Should return "Server have a error to process the request!"', async () => {
        delete req.member;

        await GroupLeave.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test('Should return "Something Went Wrong"', async () => {

        MemberRepository.removeMemberById = jest.fn().mockImplementation(() => {
            throw new Error("Something Went Wrong");
        });

        await GroupLeave.handle(
            req,
            res,
            next
        );

        

        expect(res.response.payload).toBe("Something Went Wrong");
        expect(res.code).toBe(500);
    });

    test('Should return "Something Went Wrong"', async () => {

        UserRepository.removeGroup = jest.fn().mockImplementation(() => {
            throw new Error("Something Went Wrong");
            
        });

        await GroupLeave.handle(
            req,
            res,
            next
        );

    

        expect(res.response.payload).toBe("Something Went Wrong");
        expect(res.code).toBe(500);
    });

    test('Should return "Something Went Wrong"', async () => {

        GroupRepository.removeMember = jest.fn().mockImplementation(() => {
            throw new Error("Something Went Wrong");
        });


        await GroupLeave.handle(
            req,
            res,
            next
        );

        
        expect(res.response.payload).toBe("Something Went Wrong");
        expect(res.code).toBe(500);
    });



})