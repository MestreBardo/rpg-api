import { Validator } from "../../../../src/helpers/Validator";
import { CampaignUpdateNameValidator } from "../../../../src/common/validators/Campaign/CampaignUpdateName.joi";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";


let res: any = {};
let req: any = {};
let next = jest.fn();


describe("Test CampaignUpdateNameValidator", () => {
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
            groupId: "618006e0bd56c9b01f5bcc1e",
        };

        Validator.validate(
            CampaignUpdateNameValidator.schema,
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
            groupId: "618006e0bd56c9b01f5bcc1e"
        };

        Validator.validate(
            CampaignUpdateNameValidator.schema,
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
            groupId: "618006e0bd56c9b01f5bcc1e"
        };

        Validator.validate(
            CampaignUpdateNameValidator.schema,
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
            groupId: "618006e0bd56c9b01f5bcc1e"
        };

        Validator.validate(
            CampaignUpdateNameValidator.schema,
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
            groupId: "618006e0bd56c9b01f5bcc1e"
        };

        Validator.validate(
            CampaignUpdateNameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Name has more than 30 characters");
    });

    test("Should return 'This id is not valid'", () => {
        req.body = {
            name: "teste group 5",
            groupId: "618bd56c9b01f5bcc1e",
        };

        Validator.validate(
            CampaignUpdateNameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("This id is not valid");
    });

    test("Should return 'Id is required!'", () => {
        req.body = {
            name: "teste group 5",
        };

        Validator.validate(
            CampaignUpdateNameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Id is required!");
    });


    test("Should return 'Id field is empty'", () => {
        req.body = {
            name: "teste group 5",
            groupId: "",
        };

        Validator.validate(
            CampaignUpdateNameValidator.schema,
            ValidationSource.BODY
        )(
            req,
            res,
            next
        );

        expect(res.code).toBe(400);
        expect(res.response.payload).toContain("Id field is empty");
    });
})