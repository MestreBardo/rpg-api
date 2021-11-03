import { AuthorizationSignUp } from "../../../../src/core/handles/Authorization/AuthorizationSignUp.handle";
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

        UserRepository.createOne = jest.fn().mockReturnValue({
            name: "member"
        });

        GenerateJwtService.execute = jest.fn().mockReturnValue({
            name: "member"
        });

    });

    test('Should return token', async () => {
        
       
        await AuthorizationSignUp.handle(
            req,
            res,
            next
        )


        expect(res.code).toBe(201);
        expect(res.response.payload.name).toBe("member");
    });




    test("Should return 'Server have a error to process the request'", async () => {

        delete req.body;
        await AuthorizationSignUp.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });





    test("Should return 'Something went wrong'", async () => {

        UserRepository.createOne = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
        });
        await AuthorizationSignUp.handle(
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
        await AuthorizationSignUp.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });



})