import { MemberAdminRole } from "../../../../src/core/handles/Member/MemberAdminRole";


// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();


describe('Test MemberAdminRoleHandle', () => {
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
            member: {
                role: "admin"
            }
        }

        next = jest.fn();
    });

    test('Should user have permission (admin)', async () => {
        req.member.role = "admin";
       
        await MemberAdminRole.handle(
            req,
            res,
            next
        )
        console.log(res.response)


        expect(next).toBeCalled();
    });

    test('Should user have permission (owner)', async () => {
        req.member.role = "owner";
       
        await MemberAdminRole.handle(
            req,
            res,
            next
        )


        expect(next).toBeCalled();
    });


    test("Should return 'Server have a error to process the request!'", async () => {


        delete req.member;
       
        await MemberAdminRole.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test("Should user don't have permission", async () => {


        req.member.role = "user";
       
        await MemberAdminRole.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("You dont have permission to do this.");
        expect(res.code).toBe(401);
    });



})