import { Validator } from "../../../../src/helpers/Validator";
import { CampaignCreateValidator } from "../../../../src/common/validators/Campaign/CampaignCreate.joi";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";


let res: any = {};
let req: any = {};
let next = jest.fn();


describe("Test CampaignCreateValidator", () => {
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
            name: "testeCampaign",
            system: "testeSystem"
        };

        Validator.validate(
            CampaignCreateValidator.schema,
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

    test("Should return 'Name not found'", () => {
        req.body = {
            system: "testeSystem"
        };

        Validator.validate(
            CampaignCreateValidator.schema,
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
        .toContain("Name not found")
    });

    test("Should return 'Name field is empty'", () => {
        req.body = {
            name: "",
            system: "testeSystem"
        };

        Validator.validate(
            CampaignCreateValidator.schema,
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
        .toContain("Name field is empty")
    });


    test("Should return 'Name has less than 3 characters'", () => {
        req.body = {
            name: "fd",
            system: "testeSystem"
        };

        Validator.validate(
            CampaignCreateValidator.schema,
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
        .toContain("Name has less than 3 characters")
    });


    test("Should return 'Name has more than 30 characters'", () => {
        req.body = {
            name: "fdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdasasasasasasad",
            system: "testeSystem"
        };

        Validator.validate(
            CampaignCreateValidator.schema,
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
        .toContain("Name has more than 30 characters")
    });


    test("Should return 'System not found'", () => {
        req.body = {
            name: "testeCampaign",
        };

        Validator.validate(
            CampaignCreateValidator.schema,
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
        .toContain("System not found")
    });


    test("Should return 'System field is empty'", () => {
        req.body = {
            name: "testeCampaign",
            system: ""
        };

        Validator.validate(
            CampaignCreateValidator.schema,
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
        .toContain("System field is empty")
    });

})