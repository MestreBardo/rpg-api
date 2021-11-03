import { Validator } from "../../../../src/helpers/Validator";
import { CampaignUpdateNameValidator } from "../../../../src/common/validators/Campaign/CampaignUpdateName.joi";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";
import { GroupUpdateNameValidator } from "../../../../src/common/validators/Group/GroupUpdateName.joi";


let res: any = {};
let req: any = {};
let next = jest.fn();


describe("Test GroupUpdateNameValidator", () => {
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

    test("Should be valid name", () => {
        req.body = {
            name: "teste group 5",
        };

        Validator.validate(
            GroupUpdateNameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(next).toBeCalled();
    });

    test("Should return 'Name not found'", () => {
        req.body = {
        };

        Validator.validate(
            GroupUpdateNameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Name not found");
    });

    test("Should return 'Name field is empty'", () => {
        req.body = {
            name: "",
        };

        Validator.validate(
            GroupUpdateNameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Name field is empty");
    });


    test("Should return 'Name has less than 3 characters'", () => {
        req.body = {
            name: "te",
        };

        Validator.validate(
            GroupUpdateNameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Name has less than 3 characters");
    });

    test("Should return 'Name has more than 30 characters'", () => {
        req.body = {
            name: "tsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssdsdse",
        };

        Validator.validate(
            GroupUpdateNameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Name has more than 30 characters");
    });

})