import { UserUpdate } from "../../../../src/core/handles/User/UserUpdate.handle";
import { GenerateJwtService } from "../../../../src/core/services/GenerateJwt.service";
import { UserRepository } from "../../../../src/database/repositories/User.repository";

// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();


describe('Test UserUpdateHandle', () => {
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
            body: {
                email: "admin@admin.com"
            }
        }

        UserRepository.updateOneById = jest.fn().mockReturnValue({
            name: "member"
        });

        GenerateJwtService.execute = jest.fn().mockReturnValue({
            name: "member"
        });

        next = jest.fn();
    });

    test('Should return token', async () => {
        
       
        await UserUpdate.handle(
            req,
            res,
            next
        )
        expect(res.code).toBe(200);
        expect(res.response.payload.name).toBe("member");
    });


    test("Should return 'Server have a error to process the request!'", async () => {

        delete req.user;
        await UserUpdate.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });

    test("Should return 'Server have a error to process the request!'", async () => {

        delete req.body;
        await UserUpdate.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test("Should return 'Something went wrong'", async () => {

        UserRepository.updateOneById = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
        });
        await UserUpdate.handle(
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
        await UserUpdate.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });



    


})