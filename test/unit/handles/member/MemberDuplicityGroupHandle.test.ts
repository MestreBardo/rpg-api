import { MemberDuplicityGroup } from "../../../../src/core/handles/Member/MemberDuplicityGroup.handle";
import { MemberRepository } from "../../../../src/database/repositories/Member.repository";

// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();


describe('Test MemberDuplicityGroupHandle', () => {
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

        req = {
            user: {
                name: "admin"
            },
            group: {
                name: "admin"
            }
        }

        MemberRepository.findByUserOnCampaign = jest.fn().mockReturnValue(null);

        next = jest.fn();
    });

    test('Should user have no dopple', async () => {
        
       
        await MemberDuplicityGroup.handle(
            req,
            res,
            next
        )


        expect(next).toBeCalled();
    });

    test('Should user have dopple', async () => {
       
        MemberRepository.findByUserOnCampaign = jest.fn().mockReturnValue({
            name: "dopple"
        });
        await MemberDuplicityGroup.handle(
            req,
            res,
            next
        )


        expect(res.code).toBe(409);
        expect(res.response.payload).toBe("User already exists on group");
    });


    test("Should return 'Server have a error to process the request!'", async () => {

        delete req.user;
        await MemberDuplicityGroup.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test("Should return 'Server have a error to process the request!'", async () => {

        delete req.group;
        await MemberDuplicityGroup.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test("Should return 'Something went wrong'", async () => {

        MemberRepository.findByUserOnCampaign = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
        });
        await MemberDuplicityGroup.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });



})