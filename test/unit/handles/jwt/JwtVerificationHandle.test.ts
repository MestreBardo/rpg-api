import { JwtVerification } from "../../../../src/core/handles/Jwt/JwtVerification.handle";

// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();
let mockStaticF = jest.fn().mockReturnValue('worked')



describe('Test JwtVerificationHandle', () => {
    beforeAll(() => {
        process.env.TOKEN = "69d2a02b580df3f96b1287ac98f05261"
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
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTdmNWJjODFmYWY2MWYzOWNmMThiN2UiLCJuYW1lIjoicmFmYWVsIiwic3VybmFtZSI6ImxvcGVzcyIsImVtYWlsIjoibXJibGFja0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im1yYmxhY2siLCJjb3VudHJ5IjoiYnJhc2lsIiwiY2l0eSI6InJpbyBkZSBqYW5laXJvIiwiZ2VuZGVyIjoibWFzY3VsaW5vIiwiYmlydGhkYXkiOiIyMDIwLTAxLTAyVDAwOjAwOjAwLjAwMFoiLCJncm91cENvdW50IjowLCJjYW1wYWluZ0NvdW50IjowLCJfX3YiOjAsImlhdCI6MTYzNTczNzAxMiwiYXVkIjoid2ViYXBwIiwiaXNzIjoiTGl0dGxlTW9ua2V5Iiwic3ViIjoiNjE3ZjViYzgxZmFmNjFmMzljZjE4YjdlIn0._NBjV8aNyDD--H3dfRckJyyPnfLUbIHsD11a1WEqKso"
            }
        }

        next = jest.fn();
    });

    test('Should valid token', async () => {
        
       
        await JwtVerification.handle(
            req,
            res,
            next
        )

 
        expect(next).toBeCalled();
    });


    test("Should return 'Server have a error to process the request!'", async () => {


        delete req.headers.authorization;
       
        await JwtVerification.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test("Should return 'Token is not valid'", async () => {

        req.headers.authorization = "Bearer";

        await JwtVerification.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Token is not valid");
        expect(res.code).toBe(401);
    });


    test("Should return 'Token is not valid'", async () => {

        req.headers.authorization = "sfdfdfdsfdfsdfdsfsdfdsf";

        await JwtVerification.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Token is not valid");
        expect(res.code).toBe(401);
    });


    test("Should return 'Token is not valid'", async () => {

        req.headers.authorization = "Bearer sfdfdfdsfdfsdfdsfsdfdsf";

        await JwtVerification.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Token is not valid");
        expect(res.code).toBe(401);
    });


})