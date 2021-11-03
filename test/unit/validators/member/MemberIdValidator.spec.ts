import { Validator } from "../../../../src/helpers/Validator";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";
import { MemberIdValidator } from "../../../../src/common/validators/Member/MemberId.joi";


let res: any = {};
let req: any = {};
let next = jest.fn();


describe("Test MemberIdValidator", () => {
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
            memberId: "618006e0bd56c9b01f5bcc1e",
        };

        Validator.validate(
            MemberIdValidator.schema,
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
            memberId: "61800656c01f5bcc1e",
        };

        Validator.validate(
            MemberIdValidator.schema,
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
            MemberIdValidator.schema,
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
            memberId: "",
        };

        Validator.validate(
            MemberIdValidator.schema,
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