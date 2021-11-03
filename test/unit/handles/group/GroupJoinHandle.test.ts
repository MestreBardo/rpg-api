import { GroupJoin } from "../../../../src/core/handles/Group/GroupJoin.handle";
import { GroupRepository } from "../../../../src/database/repositories/Group.repository"
import { MemberRepository } from "../../../../src/database/repositories/Member.repository";
import { UserRepository } from "../../../../src/database/repositories/User.repository";

// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();



describe('Test GroupJoinHandle', () => {
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
            params: {
                groupId: "64646464646"
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
            }
        };

        MemberRepository.createOne = jest.fn().mockReturnValue({
            role: "user"
        });

        UserRepository.addGroup = jest.fn();

        GroupRepository.addMember = jest.fn();
    });

    test('Should return the joined member', async () => {

        await GroupJoin.handle(
            req,
            res,
            next
        )

        expect(res.response.payload.name).toBe("group1");
        expect(res.code).toBe(201);
    });

  

    test('Should return "Server have a error to process the request!"', async () => {
        delete req.user;

        await GroupJoin.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test('Should return "Server have a error to process the request!"', async () => {
        delete req.group;

        await GroupJoin.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test('Should return "Something Went Wrong"', async () => {

        MemberRepository.createOne = jest.fn().mockImplementation(() => {
            throw new Error("Something Went Wrong");
        });

        await GroupJoin.handle(
            req,
            res,
            next
        );

        

        expect(res.response.payload).toBe("Something Went Wrong");
        expect(res.code).toBe(500);
    });

    test('Should return "Something Went Wrong"', async () => {

        UserRepository.addGroup = jest.fn().mockImplementation(() => {
            throw new Error("Something Went Wrong");
            
        });

        await GroupJoin.handle(
            req,
            res,
            next
        );

    

        expect(res.response.payload).toBe("Something Went Wrong");
        expect(res.code).toBe(500);
    });

    test('Should return "Something Went Wrong"', async () => {

        GroupRepository.addMember = jest.fn().mockImplementation(() => {
            throw new Error("Something Went Wrong");
        });


        await GroupJoin.handle(
            req,
            res,
            next
        );

        
        expect(res.response.payload).toBe("Something Went Wrong");
        expect(res.code).toBe(500);
    });



})