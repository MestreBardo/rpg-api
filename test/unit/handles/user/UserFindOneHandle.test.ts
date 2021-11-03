import { UserFindMe } from "../../../../src/core/handles/User/UserFindMe.handle";
import { UserRepository } from "../../../../src/database/repositories/User.repository";


// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();


describe('Test UserFindOneHandle', () => {
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
                _id: "admin"
            }
        }

        next = jest.fn();

        UserRepository.findOneById = jest.fn().mockReturnValue({
            name: "member"
        });

    });

    test('Should append user', async () => {
        
       
        await UserFindMe.handle(
            req,
            res,
            next
        )


        expect(res.code).toBe(200);
        expect(res.response.payload.name).toBe("member");
    });


    test("Should not found user", async () => {

        UserRepository.findOneById = jest.fn().mockReturnValue(null);
        await UserFindMe.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("User not found in database");
        expect(res.code).toBe(404);
    });

    test("Should return 'User not found in request'", async () => {

        delete req.token._id;
        await UserFindMe.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("User not found in request");
        expect(res.code).toBe(400);
    });




    test("Should return 'Something went wrong'", async () => {

        UserRepository.findOneById = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong");
        });
        await UserFindMe.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong");
        expect(res.code).toBe(500);
    });
    


})