import { AuthorizationSignIn } from "../../../../src/core/handles/Authorization/AuthorizationSignIn.handle";
import { CheckPasswordService } from "../../../../src/core/services/CheckPassword.service";
import { GenerateJwtService } from "../../../../src/core/services/GenerateJwt.service";
import { UserRepository } from "../../../../src/database/repositories/User.repository";


// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();


describe('Test AuthorizationSignInHandle', () => {
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
            body: {
                login: "admin",
                password: "admin"
            }
        }

        next = jest.fn();

        UserRepository.findByUsernameOrEmail = jest.fn().mockReturnValue({
            name: "member"
        });

        CheckPasswordService.execute = jest.fn().mockReturnValue(true);

        GenerateJwtService.execute = jest.fn().mockReturnValue({
            name: "member"
        });

    });

    test('Should append user', async () => {
        
       
        await AuthorizationSignIn.handle(
            req,
            res,
            next
        )


        expect(res.code).toBe(200);
        expect(res.response.payload.name).toBe("member");
    });


    test("Should not found user", async () => {

        UserRepository.findByUsernameOrEmail = jest.fn().mockReturnValue(null);
        await AuthorizationSignIn.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("User not found");
        expect(res.code).toBe(404);
    });

    test("Should password not match", async () => {

        CheckPasswordService.execute = jest.fn().mockReturnValue(false);
        await AuthorizationSignIn.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Password don't match");
        expect(res.code).toBe(401);
    });

    test("Should return 'Server have a error to process the request!'", async () => {

        delete req.body.login;
        await AuthorizationSignIn.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test("Should return 'Server have a error to process the request!'", async () => {

        delete req.body.password;
        await AuthorizationSignIn.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });




    test("Should return 'Something went wrong'", async () => {

        UserRepository.findByUsernameOrEmail = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
        });
        await AuthorizationSignIn.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });

    test("Should return 'Something went wrong'", async () => {

        CheckPasswordService.execute = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
        });
        await AuthorizationSignIn.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });

    test("Should return 'Something went wrong'", async () => {

        GenerateJwtService.execute = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
        });
        await AuthorizationSignIn.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });
    


})