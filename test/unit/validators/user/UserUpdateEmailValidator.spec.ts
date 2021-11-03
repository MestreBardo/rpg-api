import { Validator } from "../../../../src/helpers/Validator";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";
import { UserUpdateEmailValidator } from "../../../../src/common/validators/User/UserUpdateEmail.joi";

let res: any = {};
let req: any = {};
let next = jest.fn();


describe("Test UserUpdateEmailValidator", () => {
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
        req.body = {
            email: "email@gmail.com",
            confirmationPassword: "@passwordconfirmation",
        };
        next = jest.fn();
    });

    test("Should be valid", () => {

        Validator.validate(
            UserUpdateEmailValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(next).toBeCalled();
    });

    test("Should return 'Email not found'", () => {
        delete req.body.email;

        Validator.validate(
            UserUpdateEmailValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Email not found");
    });

    test("Should return 'Email field is empty'", () => {
        req.body.email = "";

        Validator.validate(
            UserUpdateEmailValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Email field is empty");
    });


    test("Should return 'Email is invalid'", () => {
        req.body.email = "te@gmail@.com"

        Validator.validate(
            UserUpdateEmailValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Email is invalid");
    });

    test("Should return 'Email is invalid'", () => {
        req.body.email = "te#gmail.com"

        Validator.validate(
            UserUpdateEmailValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Email is invalid");
    });


    test("Should return 'Confirmation password field not found'", () => {
        delete req.body.confirmationPassword

        Validator.validate(
            UserUpdateEmailValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Confirmation password field not found");
    });

    test("Should return 'Confirmation password field is empty'", () => {
        req.body.confirmationPassword = ""

        Validator.validate(
            UserUpdateEmailValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Confirmation password field is empty");
    });

})