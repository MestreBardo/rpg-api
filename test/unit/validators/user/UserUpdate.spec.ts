import { Validator } from "../../../../src/helpers/Validator";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";
import { UserUpdateValidator } from "../../../../src/common/validators/User/UserUpdate.joi";


let res: any = {};
let req: any = {};
let next = jest.fn();


describe("Test UserUpdateValidator", () => {
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
            name: "Vinycius",
            surname: "Monteiro",
            confirmationPassword: "@misterPassword",
            country: "brasil",
            city: "rio de janeiro",
            gender: "man",
            birthday: "10-10-2020"
        };
        next = jest.fn();
    });

    test('Should body valid', () => {

        Validator.validate(
            UserUpdateValidator.schema,
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

   

    test("Should return 'Name field is empty'", () => {
        req.body.name = "";

        Validator.validate(
            UserUpdateValidator.schema,
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
        req.body.name = "fd"

        Validator.validate(
            UserUpdateValidator.schema,
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
        req.body.name = "fdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdasasasasasasad"

        Validator.validate(
            UserUpdateValidator.schema,
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


    test("Should return 'Surname field is empty'", () => {
        req.body.surname = "";

        Validator.validate(
            UserUpdateValidator.schema,
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
        .toContain("Surname field is empty")
    });


    test("Should return 'Surname has less than 3 characters'", () => {
        req.body.surname = "fd"

        Validator.validate(
            UserUpdateValidator.schema,
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
        .toContain("Surname has less than 3 characters")
    });


    test("Should return 'Surname has more than 50 characters'", () => {
        req.body.surname = "fdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdasasasasasasaddsdsdsdsdsdsdsdsddsdsdsdsdsdsdsdsdsds"

        Validator.validate(
            UserUpdateValidator.schema,
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
        .toContain("Surname has more than 50 characters")
    });


   
    test("Should return 'Confirmation password field not found'", () => {
        delete req.body.confirmationPassword

        Validator.validate(
            UserUpdateValidator.schema,
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
        .toContain("Confirmation password field not found")
    });

    test("Should return 'Confirmation password field is empty'", () => {
        req.body.confirmationPassword = "";

        Validator.validate(
            UserUpdateValidator.schema,
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
        .toContain("Confirmation password field is empty")
    });


    test("Should return 'Country field is empty'", () => {
        req.body.country = "";

        Validator.validate(
            UserUpdateValidator.schema,
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
        .toContain("Country field is empty")
    });


    test("Should return 'City field is empty'", () => {
        req.body.city = "";

        Validator.validate(
            UserUpdateValidator.schema,
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
        .toContain("City field is empty")
    });


    test("Should return 'Gender field is empty'", () => {
        req.body.gender = "";

        Validator.validate(
            UserUpdateValidator.schema,
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
        .toContain("Gender field is empty")
    });


    test("Should return 'Birthday must be a valid date'", () => {
        req.body.birthday = "";

        Validator.validate(
            UserUpdateValidator.schema,
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
        .toContain("Birthday must be a valid date")
    });

    test("Should return 'Birthday must be a valid date'", () => {
        req.body.birthday = "13-13-2020";

        Validator.validate(
            UserUpdateValidator.schema,
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
        .toContain("Birthday must be a valid date")
    });




})