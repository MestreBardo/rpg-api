import { MemberUpdateRole } from "../../../../src/core/handles/Member/MemberUpdateRole.handle";
import { MemberRepository } from "../../../../src/database/repositories/Member.repository";



// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();


describe('Test MemberUpdateRoleHandle', () => {
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
                _id: "user",
                name: "admin"
            },
            params: {
                memberId: "454544545454454"
            }
        }

        MemberRepository.findById = jest.fn().mockReturnValue({
            user: "member",
            role: "user"
        });

        next = jest.fn();
    });

    test('Should member valid', async () => {
        
       
        await MemberUpdateRole.handle(
            req,
            res,
            next
        )


        expect(next).toBeCalled();
        expect(req.otherMember.user).toBe("member");
    });

    test('Should not find member', async () => {
       
        MemberRepository.findById = jest.fn().mockReturnValue(null);
        await MemberUpdateRole.handle(
            req,
            res,
            next
        )


        expect(res.code).toBe(404);
        expect(res.response.payload).toBe("This member not exist.");
    });

    test("Should return 'You cant do this to yourself!'", async () => {

        req.user._id = "member"
        await MemberUpdateRole.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("You cant do this to yourself");
        expect(res.code).toBe(401);
    });

    test("Should return 'You dont have permission to do this.'", async () => {

        MemberRepository.findById = jest.fn().mockReturnValue({
            user: "member",
            role: "owner"
        });
        await MemberUpdateRole.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("You dont have permission to do this.");
        expect(res.code).toBe(401);
    });


    test("Should return 'Server have a error to process the request!'", async () => {

        delete req.user;
        await MemberUpdateRole.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test("Should return 'Server have a error to process the request!'", async () => {

        delete req.params.memberId;
        await MemberUpdateRole.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test("Should return 'Something went wrong'", async () => {

        MemberRepository.findById = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
        });
        await MemberUpdateRole.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });



})