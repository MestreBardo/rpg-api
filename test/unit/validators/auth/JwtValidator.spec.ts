import { Validator } from "../../../../src/helpers/Validator";
import { JwtValidator } from "../../../../src/common/validators/Auth/Jwt.joi";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";



let res: any = {};
let req: any = {};
let next = jest.fn();

describe("Test JwtValidator",() => {
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
            headers: {
                authorization: ""
            }
        };
    });

    beforeEach(() => {
        res.code = 0;
        res.response = "";
        req.headers.authorization = "";
        next = jest.fn();
    });

    test('Should authorization present', () => {
        req = {
            headers: {
                authorization: "Bearer dsdasdsadasdasd"
            }
        };
              
        const next = jest.fn();
        Validator.validate(
            JwtValidator.schema,
            ValidationSource.HEADER
        )(
            req,
            res,
            next
        );
    
        expect(
            next
        ).toBeCalled();
    });


    test("Should authorization not present", () => {
        req = {
            headers: {}
        }

        Validator.validate(
            JwtValidator.schema,
            ValidationSource.HEADER
        )(
            req,
            res,
            next
        )

        expect(
            res.code
        ).toBe(400);

        expect(
            res.response.payload
        ).toContain(
            "authorization is not present!"
        );
    });


    test("Should filed not present on request", () => {
        req = {
        }

        Validator.validate(
            JwtValidator.schema,
            ValidationSource.HEADER
        )(
            req,
            res,
            next
        )

        expect(
            res.code
        ).toBe(400);

        expect(
            res.response.payload
        ).toBe(
            "Source is not present on request!"
        );
    });
      
})


// test('have to return no authorization', () => {
//     res = {
//         code: 0,
//         status: function(code) {
//             this.code = code;
//         },
//         send: function(test) {

//         }
//     };

//     req = {
//         headers: {
//             authorization: ""
//         }
//     };

//     Validator.validate(
//         JwtValidator.schema,
//         ValidationSource.HEADER
//     )(
//         req,
//         res,
//         next
//     )
//     expect(
//         res.code
//     ).toBe(400);
// });

