import { UserCheckPassword } from "../../../../src/core/handles/User/UserCheckPassword.handle";
import { CheckPasswordService } from "../../../../src/core/services/CheckPassword.service";
import { MemberRepository } from "../../../../src/database/repositories/Member.repository";



// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();


describe('Test UserCheckPasswordHandle', () => {
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
            body: {
                confirmationPassword: "454544545454454"
            }
        }

        CheckPasswordService.execute = jest.fn().mockReturnValue(true);

        next = jest.fn();
    });

    test('Should password valid', async () => {
        
       
        await UserCheckPassword.handle(
            req,
            res,
            next
        )


        expect(next).toBeCalled();
    });

    test('Should password invalid', async () => {
       
        CheckPasswordService.execute = jest.fn().mockReturnValue(false);
        await UserCheckPassword.handle(
            req,
            res,
            next
        )


        expect(res.code).toBe(401);
        expect(res.response.payload).toBe("Confirmation password dont match");
    });

   

    test("Should return 'Server have a error to process the request!'", async () => {

        delete req.user;
        await UserCheckPassword.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test("Should return 'Server have a error to process the request!'", async () => {

        delete req.body.confirmationPassword;
        await UserCheckPassword.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test("Should return 'Something went wrong'", async () => {

        CheckPasswordService.execute = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
        });
        await UserCheckPassword.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });



})