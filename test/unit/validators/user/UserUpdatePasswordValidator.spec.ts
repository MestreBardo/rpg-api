import { Validator } from "../../../../src/helpers/Validator";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";
import { UserUpdatePasswordValidator } from "../../../../src/common/validators/User/UserUpdatePassword.joi";

let res: any = {};
let req: any = {};
let next = jest.fn();


describe("Test UserUpdatePasswordValidator", () => {
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
            password: "@monsterbaru",
            confirmationPassword: "@passwordconfirmation",
        };
        next = jest.fn();
    });

    test("Should be valid", () => {
        

        Validator.validate(
            UserUpdatePasswordValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(next).toBeCalled();
    });

    test("Should return 'Password not found'", () => {
        delete req.body.password;

        Validator.validate(
            UserUpdatePasswordValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Password not found");
    });

    test("Should return 'Password field is empty'", () => {
        req.body.password = "";

        Validator.validate(
            UserUpdatePasswordValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Password field is empty");
    });


    test("Should return 'Password has less than 6 characters'", () => {
        req.body.password = "te"

        Validator.validate(
            UserUpdatePasswordValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Password has less than 6 characters");
    });

    test("Should return 'Password has more than 30 characters'", () => {
        req.body.password = "tsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssdsdse",


        Validator.validate(
            UserUpdatePasswordValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Password has more than 30 characters");
    });


    test("Should return 'Confirmation password field not found'", () => {
        delete req.body.confirmationPassword

        Validator.validate(
            UserUpdatePasswordValidator.schema,
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
            UserUpdatePasswordValidator.schema,
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