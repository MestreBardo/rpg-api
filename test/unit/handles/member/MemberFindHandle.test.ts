import { MemberFind } from "../../../../src/core/handles/Member/MemberFind.handle";
import { MemberRepository } from "../../../../src/database/repositories/Member.repository";


// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();


describe('Test MemberFindHandle', () => {
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

        MemberRepository.findByUserOnCampaign = jest.fn().mockReturnValue({
            name: "member"
        });

        next = jest.fn();
    });

    test('Should find member', async () => {
        
       
        await MemberFind.handle(
            req,
            res,
            next
        )


        expect(next).toBeCalled();
        expect(req.member.name).toBe("member");
    });

    test('Should not find member', async () => {
       
        MemberRepository.findByUserOnCampaign = jest.fn().mockReturnValue(null);
        await MemberFind.handle(
            req,
            res,
            next
        )


        expect(res.code).toBe(404);
        expect(res.response.payload).toBe("User not exists on group");
    });


    test("Should return 'Server have a error to process the request!'", async () => {

        delete req.user;
        await MemberFind.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test("Should return 'Server have a error to process the request!'", async () => {

        delete req.group;
        await MemberFind.handle(
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
        await MemberFind.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });



})