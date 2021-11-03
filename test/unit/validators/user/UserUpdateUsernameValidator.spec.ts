import { Validator } from "../../../../src/helpers/Validator";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";
import { UserUpdateUsernameValidator } from "../../../../src/common/validators/User/UserUpdateUsename.joi";

let res: any = {};
let req: any = {};
let next = jest.fn();


describe("Test UserUpdateUsenameValidator", () => {
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
            username: "blackjacu",
            confirmationPassword: "@passwordconfirmation",
        };
        next = jest.fn();
    });

    test("Should be valid", () => {
        

        Validator.validate(
            UserUpdateUsernameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(next).toBeCalled();
    });

    test("Should return 'Username not found'", () => {
        delete req.body.username;

        Validator.validate(
            UserUpdateUsernameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Username not found");
    });

    test("Should return 'Username field is empty'", () => {
        req.body.username = "";

        Validator.validate(
            UserUpdateUsernameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Username field is empty");
    });


    test("Should return 'Username has less than 3 characters'", () => {
        req.body.username = "te"

        Validator.validate(
            UserUpdateUsernameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Username has less than 3 characters");
    });

    test("Should return 'Username has more than 30 characters'", () => {
        req.body.username = "tsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssdsdse",


        Validator.validate(
            UserUpdateUsernameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Username has more than 30 characters");
    });

    test("Should return 'Username not accept space and special characters'", () => {
        req.body.username = "mestreb@rdo"

        Validator.validate(
            UserUpdateUsernameValidator.schema,
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
        .toContain("Username not accept space and special characters")
    });

    test("Should return 'Username not accept space and special characters'", () => {
        req.body.username = "mestre bardo"

        Validator.validate(
            UserUpdateUsernameValidator.schema,
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
        .toContain("Username not accept space and special characters")
    });

    test("Should return 'Confirmation password field not found'", () => {
        delete req.body.confirmationPassword

        Validator.validate(
            UserUpdateUsernameValidator.schema,
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
            UserUpdateUsernameValidator.schema,
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