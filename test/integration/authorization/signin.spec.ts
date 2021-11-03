import mongoose from 'mongoose';
import { app } from "../../../src/app";
import request from 'supertest';
import { UserMongoose } from '../../../src/database/models/User.mongoose';
import { GeneratePasswordService } from '../../../src/core/services/GeneratePassword.service';

let connection: any;
let userTest: any;
let loginForms: any;

describe("Test signup route", () => {
    beforeAll(async() => {
        await mongoose.connect(process.env.DB_URI);
        

        userTest = {
            name: "vinycius",
            surname: "monteiro",
            username: "mestreBardo",
            password: await GeneratePasswordService.execute("@masterpassword"),
            confirmationPassword: "@masterpassword",
            email: "vinyciussilvamonteiro@gmail.com",
            country: "brasil",
            city: "rio de janeiro",
            gender: "man",
            birthday: "07-07-1995"
        };

        

        const user = new UserMongoose.model(userTest);
        await user.save();
    });

    beforeEach(() => {
        loginForms = {
            login: "",
            password: "@masterpassword"
        }
        
    })
    test("Should login with username", done => {
        loginForms.login = userTest.username;
        request(app)
            .post("/v1/authorization/signin")
            .send(loginForms)
            .expect(200)
            .then(async response => {
                expect(response.body.message).toBe("Ok");
                done();
            })
    });

    test("Should login with email", done => {
        loginForms.login = userTest.email;
        request(app)
            .post("/v1/authorization/signin")
            .send(loginForms)
            .expect(200)
            .then(async response => {
                expect(response.body.message).toBe("Ok");
                done();
            })
    });

    test("Should not login (with username)", done => {
        loginForms.login = "otherUser";
        request(app)
            .post("/v1/authorization/signin")
            .send(loginForms)
            .expect(404)
            .then(async response => {
                expect(response.body.payload).toBe("User not found");
                done();
            })
    });

    test("Should not login (with email)", done => {
        loginForms.login = "otherUser@gmail.com";
        request(app)
            .post("/v1/authorization/signin")
            .send(loginForms)
            .expect(404)
            .then(async response => {
                expect(response.body.payload).toBe("User not found");
                done();
            })
    });

    test("Should not Login (password incorrect)", done => {
        loginForms.login = userTest.email;
        loginForms.password = "FDFD";
        request(app)
            .post("/v1/authorization/signin")
            .send(loginForms)
            .expect(401)
            .then(async response => {
                expect(response.body.payload).toBe("Password don't match");
                done();
            })
    });

    test("Should invalid request (no login)", done => {
        delete loginForms.login;
        request(app)
            .post("/v1/authorization/signin")
            .send(loginForms)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Login not found");
                done();
            })
    });

    test("Should invalid request (login empty)", done => {
        loginForms.login = "";
        request(app)
            .post("/v1/authorization/signin")
            .send(loginForms)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Login field is empty");
                done();
            })
    });

    test("Should invalid request (no Password)", done => {
        loginForms.login = userTest.email;
        delete loginForms.password;
        request(app)
            .post("/v1/authorization/signin")
            .send(loginForms)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Password not found");
                done();
            })
    });

    test("Should invalid request (Password empty)", done => {
        loginForms.login = userTest.email;
        loginForms.password = "";
        request(app)
            .post("/v1/authorization/signin")
            .send(loginForms)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Password field is empty");
                done();
            })
    });

   
    afterAll(async() => {
        await UserMongoose.model.collection.drop();
        mongoose.connection.close();
    })
})