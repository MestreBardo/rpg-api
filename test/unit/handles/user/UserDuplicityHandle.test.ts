import { UserDuplicity } from "../../../../src/core/handles/User/UserDuplicity.handle";
import { UserRepository } from "../../../../src/database/repositories/User.repository";



// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();


describe('Test UserDuplicityHandle', () => {
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
                email: "454544545454454",
                username: "mestrebardoi"
            }
        }

        UserRepository.findByUsernameOrEmail = jest.fn().mockReturnValue(null);

        next = jest.fn();
    });

    test('Should user have no dopple', async () => {
        
       
        await UserDuplicity.handle(
            req,
            res,
            next
        )


        expect(next).toBeCalled();
    });

    test('Should user have dopple (email)', async () => {
       
        UserRepository.findByUsernameOrEmail = jest.fn().mockReturnValue({
            email: "454544545454454",
            username: "mestrebardoic"
        });

        await UserDuplicity.handle(
            req,
            res,
            next
        )


        expect(res.code).toBe(409);
        expect(res.response.payload).toContain("Email alrealdy exists in database");
    });

    test('Should user have dopple (username)', async () => {
       
        UserRepository.findByUsernameOrEmail = jest.fn().mockReturnValue({
            email: "454544545454454d",
            username: "mestrebardoi"
        });
        await UserDuplicity.handle(
            req,
            res,
            next
        )


        expect(res.code).toBe(409);
        expect(res.response.payload).toContain("Username alrealdy exists in database");
    });



})