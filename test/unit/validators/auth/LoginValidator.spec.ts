import { Validator } from "../../../../src/helpers/Validator";
import { LoginValidator } from "../../../../src/common/validators/Auth/Login.joi";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";


let res: any = {};
let req: any = {};
let next = jest.fn();

describe("Test LoginValidator", () => {
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
            body: {}
        };
    });

    beforeEach(() => {
        res.code = 0;
        res.response = "";
        req.body = {};
        next = jest.fn();
    });

    test('Should body valid', () => {
        req.body = {
            login: "vinyciusmonteiro",
            password: "@password"
        };

        Validator.validate(
            LoginValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(
            next
        )
        .toBeCalled();
    });

    test("Should return 'Login not found'", () => {
        req.body = {
            password: "@password"
        };

        Validator.validate(
            LoginValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(
            res.code
        )
        .toBe(400);

        expect(
            res.response.payload
        )
        .toContain("Login not found")
    });


    test("Should return 'Password not found'", () => {
        req.body = {
            login: "vinyciusmonteiro"
        };

        Validator.validate(
            LoginValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(
            res.code
        )
        .toBe(400);

        expect(
            res.response.payload
        )
        .toContain("Password not found");
    });


    test("Should return 'Source is not present on request!'", () => {
        req = {
        };

        Validator.validate(
            LoginValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(
            res.code
        )
        .toBe(400);

        expect(
            res.response.payload
        )
        .toBe("Source is not present on request!");
    });

})