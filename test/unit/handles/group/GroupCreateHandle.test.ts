import { GroupCreate } from "../../../../src/core/handles/Group/GroupCreate.handle";
import { GroupRepository } from "../../../../src/database/repositories/Group.repository"
import { MemberRepository } from "../../../../src/database/repositories/Member.repository";
import { UserRepository } from "../../../../src/database/repositories/User.repository";

// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();
let mockStaticF = jest.fn().mockReturnValue('worked')



describe('Test GroupCreateHandle', () => {
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
        GroupRepository.createOne = jest.fn().mockReturnValue({
            name: "created Group"
        });

        MemberRepository.createOne = jest.fn().mockReturnValue({
            role: "owner"
        }); 

        UserRepository.addGroup = jest.fn();

        req = {}
    });

    test('Should return Created Group', async () => {

        req.user = {
            _id: "4444444444444",
            username: "bardoas",
            email: "bardoas@gmail.com"
        }

        req.body = {
            name: "group"
        }
       
        await GroupCreate.handle(
            req,
            res,
            next
        )

        expect(res.response.payload.name).toBe("created Group");
        expect(res.code).toBe(201);
    });


    test("Should return 'Server have a error to process the request!'", async () => {


        req.body = {
            name: "group"
        }
       
        await GroupCreate.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test("Should return 'Server have a error to process the request!'", async () => {

        req.user = {
            _id: "4444444444444",
            username: "bardoas",
            email: "bardoas@gmail.com"
        }

        await GroupCreate.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test("Should return 'Something Went wrong with GroupRepository'", async () => {

        req.user = {
            _id: "4444444444444",
            username: "bardoas",
            email: "bardoas@gmail.com"
        }

        req.body = {
            name: "group"
        }

        GroupRepository.createOne = jest.fn().mockImplementation(() =>{
            throw new Error("Something Went wrong with GroupRepository");
        });


        await GroupCreate.handle(
            req,
            res,
            next
        );

        expect(res.response.payload).toBe("Something Went wrong with GroupRepository");
        expect(res.code).toBe(500);
    });


    test("Should return 'Something Went wrong with UserRepository'", async () => {

        req.user = {
            _id: "4444444444444",
            username: "bardoas",
            email: "bardoas@gmail.com"
        }

        req.body = {
            name: "group"
        }
        
        UserRepository.addGroup = jest.fn().mockImplementation(() =>{
            throw new Error("Something Went wrong with UserRepository");
        }); 

        await GroupCreate.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something Went wrong with UserRepository");
        expect(res.code).toBe(500);
    });

    test("Should return 'Something Went wrong with MemberRepository'", async () => {

        req.user = {
            _id: "4444444444444",
            username: "bardoas",
            email: "bardoas@gmail.com"
        }

        req.body = {
            name: "group"
        }

        MemberRepository.createOne = jest.fn().mockImplementation(() =>{
            throw new Error("Something Went wrong with MemberRepository");
        }); 


        await GroupCreate.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something Went wrong with MemberRepository");
        expect(res.code).toBe(500);
    });

})