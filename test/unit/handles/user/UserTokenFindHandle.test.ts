import { UserTokenFind } from "../../../../src/core/handles/User/UserTokenFind.handle";
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
            token: {
                sub: "admin"
            }
        }

        next = jest.fn();

        UserRepository.findOneById = jest.fn().mockReturnValue({
            name: "member"
        });

    });

    test('Should append user', async () => {
        
       
        await UserTokenFind.handle(
            req,
            res,
            next
        )


        expect(next).toBeCalled();
        expect(req.user.name).toBe("member");
    });


    test("Should not found user", async () => {

        UserRepository.findOneById = jest.fn().mockReturnValue(null);
        await UserTokenFind.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("User not found in database!");
        expect(res.code).toBe(404);
    });

    test("Should return 'Token not present or incorrect'", async () => {

        delete req.token;
        await UserTokenFind.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Token not present or incorrect");
        expect(res.code).toBe(400);
    });

    test("Should return 'Token not present or incorrect'", async () => {

        delete req.token.sub;
        await UserTokenFind.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Token not present or incorrect");
        expect(res.code).toBe(400);
    });


    test("Should return 'Something went wrong'", async () => {

        UserRepository.findOneById = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
        });
        await UserTokenFind.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });
    


})