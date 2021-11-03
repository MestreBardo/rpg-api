import { Validator } from "../../../../src/helpers/Validator";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";
import { GroupCreateValidator } from "../../../../src/common/validators/Group/GroupCreate.joi";


let res: any = {};
let req: any = {};
let next = jest.fn();


describe("Test GroupCreateValidator", () => {
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
            name: "testGroup",
            isPublic: true
        };

        Validator.validate(
            GroupCreateValidator.schema,
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
            isPublic: true
        };

        Validator.validate(
            GroupCreateValidator.schema,
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
            isPublic: true 
        };

        Validator.validate(
            GroupCreateValidator.schema,
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
            isPublic: true
        };

        Validator.validate(
            GroupCreateValidator.schema,
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
            isPublic: true
        };

        Validator.validate(
            GroupCreateValidator.schema,
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


    test("Should return 'isPublic not found'", () => {
        req.body = {
            name: "testeGroup",
        };

        Validator.validate(
            GroupCreateValidator.schema,
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
        .toContain("isPublic not found")
    });


})