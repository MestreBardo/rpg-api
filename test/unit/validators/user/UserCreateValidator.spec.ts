import { Validator } from "../../../../src/helpers/Validator";
import { ValidationSource } from "../../../../src/common/enums/ValidationSource.enum";
import { UserCreateValidator } from "../../../../src/common/validators/User/UserCreate.joi";


let res: any = {};
let req: any = {};
let next = jest.fn();


describe("Test UserCreateValidator", () => {
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
            username: "mestreBardo",
            password: "@misterPassword",
            confirmationPassword: "@misterPassword",
            email: "vinyciussilvamonteiro@gmail.com",
            country: "brasil",
            city: "rio de janeiro",
            gender: "man",
            birthday: "10-10-2020"
        };
        next = jest.fn();
    });

    test('Should body valid', () => {

        Validator.validate(
            UserCreateValidator.schema,
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
        delete req.body.name;

        Validator.validate(
            UserCreateValidator.schema,
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
        req.body.name = "";

        Validator.validate(
            UserCreateValidator.schema,
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
            UserCreateValidator.schema,
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
            UserCreateValidator.schema,
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


    test("Should return 'Surname not found'", () => {
        delete req.body.surname;

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Surname not found")
    });

    test("Should return 'Surname field is empty'", () => {
        req.body.surname = "";

        Validator.validate(
            UserCreateValidator.schema,
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
            UserCreateValidator.schema,
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
            UserCreateValidator.schema,
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


    test("Should return 'Username not found'", () => {
        delete req.body.username;

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Username not found")
    });

    test("Should return 'Username field is empty'", () => {
        req.body.username = "";

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Username field is empty")
    });


    test("Should return 'Username has less than 3 characters'", () => {
        req.body.username = "fd"

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Username has less than 3 characters")
    });


    test("Should return 'Username has more than 30 characters'", () => {
        req.body.username = "fdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdasasasasasasaddsdsdsdsdsdsdsdsddsdsdsdsdsdsdsdsdsds"

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Username has more than 30 characters")
    });

    test("Should return 'Username not accept space and special characters'", () => {
        req.body.username = "mestreb@rdo"

        Validator.validate(
            UserCreateValidator.schema,
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
            UserCreateValidator.schema,
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

    test("Should return 'Password not found'", () => {
        delete req.body.password;

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Password not found")
    });

    test("Should return 'Password field is empty'", () => {
        req.body.password = "";

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Password field is empty")
    });


    test("Should return 'Password has less than 6 characters'", () => {
        req.body.password = "fd"

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Password has less than 6 characters")
    });


    test("Should return 'Password has more than 30 characters'", () => {
        req.body.password = "fdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdasasasasasasaddsdsdsdsdsdsdsdsddsdsdsdsdsdsdsdsdsds"

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Password has more than 30 characters")
    });

    test("Should return 'Confirmation password don't match password'", () => {
        req.body.confirmationPassword = "";

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Confirmation password don't match password")
    });

    test("Should return 'Confirmation password not found'", () => {
        delete req.body.confirmationPassword

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Confirmation password not found")
    });


    test("Should return 'Email not found'", () => {
        delete req.body.email;

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Email not found")
    });

    test("Should return 'Email field is empty'", () => {
        req.body.email = "";

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Email field is empty")
    });

    test("Should return 'Email is invalid'", () => {
        req.body.email = "vinyciusmgmail.com.br";

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Email is invalid")
    });

    test("Should return 'Country not found'", () => {
        delete req.body.country;

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Country not found")
    });

    test("Should return 'Country field is empty'", () => {
        req.body.country = "";

        Validator.validate(
            UserCreateValidator.schema,
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

    test("Should return 'City not found'", () => {
        delete req.body.city;

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("City not found")
    });

    test("Should return 'City field is empty'", () => {
        req.body.city = "";

        Validator.validate(
            UserCreateValidator.schema,
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

    test("Should return 'Gender not found'", () => {
        delete req.body.gender;

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Gender not found")
    });

    test("Should return 'Gender field is empty'", () => {
        req.body.gender = "";

        Validator.validate(
            UserCreateValidator.schema,
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


    test("Should return 'Birthday not found'", () => {
        delete req.body.birthday;

        Validator.validate(
            UserCreateValidator.schema,
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
        .toContain("Birthday not found")
    });

    test("Should return 'Birthday must be a valid date'", () => {
        req.body.birthday = "";

        Validator.validate(
            UserCreateValidator.schema,
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
            UserCreateValidator.schema,
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