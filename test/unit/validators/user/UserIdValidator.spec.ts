import { Validator } from "../../../../src/helpers/Validator";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";
import { UserIdValidator } from "../../../../src/common/validators/User/UserId.joi";



let res: any = {};
let req: any = {};
let next = jest.fn();


describe("Test UserIdValidator", () => {
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

    test("Should be valid id", () => {
        req.params = {
            userId: "618006e0bd56c9b01f5bcc1e",
        };

        Validator.validate(
            UserIdValidator.schema,
            ValidationSource.PARAMS
        )(
            req,
            res,
            next
        );

        expect(next).toBeCalled();
    });

    test("Should return 'This id is not valid'", () => {
        req.params = {
            userId: "61800656c01f5bcc1e",
        };

        Validator.validate(
            UserIdValidator.schema,
            ValidationSource.PARAMS
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("This id is not valid");
    });

    test("Should return 'Id is required!'", () => {
        req.params = {
        };

        Validator.validate(
            UserIdValidator.schema,
            ValidationSource.PARAMS
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Id is required!");
    });


    test("Should return 'Id field is empty'", () => {
        req.params = {
            userId: "",
        };

        Validator.validate(
            UserIdValidator.schema,
            ValidationSource.PARAMS
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Id field is empty");
    });
})