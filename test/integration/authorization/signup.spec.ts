import mongoose from 'mongoose';
import { app } from "../../../src/app";
import request from 'supertest';
import { UserMongoose } from '../../../src/database/models/User.mongoose';

let connection: any;
let userTest: any;
let otherUser: any;

describe("Test signup route", () => {
    beforeAll(async() => {
        await mongoose.connect(process.env.DB_URI);
        

        otherUser = {
            name: "rafael",
            surname: "peixoto brito",
            username: "blackjaku",
            password: "@masterpassword",
            confirmationPassword: "@masterpassword",
            email: "rafaelpeixoto@gmail.com",
            country: "brasil",
            city: "rio de janeiro",
            gender: "man",
            birthday: "07-07-1995"
        }

        const user = new UserMongoose.model(otherUser);
        await user.save();
    });

    beforeEach(() => {
        userTest = {
            name: "vinycius",
            surname: "monteiro",
            username: "mestreBardo",
            password: "@masterpassword",
            confirmationPassword: "@masterpassword",
            email: "vinyciussilvamonteiro@gmail.com",
            country: "brasil",
            city: "rio de janeiro",
            gender: "man",
            birthday: "07-07-1995"
        };
        
    })
    test("Should create a new user", done => {
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(201)
            .then(async response => {
                expect(response.body.message).toBe("Created");
                const user = await UserMongoose.model.findOne({
                    username: userTest.username
                });
                expect(user).not.toBeNull();
                done();
            })
    });

    test("Should be invalid (no Name)", done => {
        delete userTest.name;
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Name not found");
                done();
            })
    });

    test("Should be invalid (Name empty)", done => {
        userTest.name = "";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Name field is empty");
                done();
            })
    });

    test("Should be invalid (Name short)", done => {
        userTest.name = "tu";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Name has less than 3 characters");
                done();
            })
    });

    test("Should be invalid (Name long)", done => {
        userTest.name = "impossibletodescribethisnamebecauseistolongtoreadandbesofragile";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Name has more than 30 characters");
                done();
            })
    });

    test("Should be invalid (no Surname)", done => {
        delete userTest.surname;
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Surname not found");
                done();
            })
    });

    test("Should be invalid (Surname empty)", done => {
        userTest.surname = "";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Surname field is empty");
                done();
            })
    });

    test("Should be invalid (Surname short)", done => {
        userTest.surname = "tu";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Surname has less than 3 characters");
                done();
            })
    });

    test("Should be invalid (Surname long)", done => {
        userTest.surname = "impossibletodescribethisnamebecauseistolongtoreadandbesofragileandmoreandmoremoremoremoerthingsshit";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Surname has more than 50 characters");
                done();
            })
    });


    test("Should be invalid (no Username)", done => {
        delete userTest.username;
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Username not found");
                done();
            })
    });

    test("Should be invalid (Username empty)", done => {
        userTest.username = "";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Username field is empty");
                done();
            })
    });

    test("Should be invalid (Username short)", done => {
        userTest.username = "tu";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Username has less than 3 characters");
                done();
            })
    });

    test("Should be invalid (Username long)", done => {
        userTest.username = "impossibletodescribethisnamebecauseistolongtoreadandbesofragileandmoreandmoremoremoremoerthingsshit";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Username has more than 30 characters");
                done();
            })
    });

    test("Should be invalid (Username space character)", done => {
        userTest.username = "mestre bardo";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Username not accept space and special characters");
                done();
            })
    });

    test("Should be invalid (Username special character)", done => {
        userTest.username = "mestreb@rdo";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Username not accept space and special characters");
                done();
            })
    });

    test("Should be invalid (no Password)", done => {
        delete userTest.password;
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Password not found");
                done();
            })
    });

    test("Should be invalid (Password empty)", done => {
        userTest.password = "";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Password field is empty");
                done();
            })
    });

    test("Should be invalid (Password short)", done => {
        userTest.password = "tu";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Password has less than 6 characters");
                done();
            })
    });

    test("Should be invalid (Password long)", done => {
        userTest.password = "impossibletodescribethisnamebecauseistolongtoreadandbesofragileandmoreandmoremoremoremoerthingsshit";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Password has more than 30 characters");
                done();
            })
    });


    test("Should be invalid (no Confirmation Password)", done => {
        delete userTest.confirmationPassword;
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Confirmation password not found");
                done();
            })
    });

    test("Should be invalid (Confirmation Password empty)", done => {
        userTest.confirmationPassword = "";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Confirmation password field is empty");
                done();
            })
    });

    test("Should be invalid (Confirmation Password not match)", done => {
        userTest.confirmationPassword = "tu";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Confirmation password don't match password");
                done();
            })
    });


    test("Should be invalid (no Email)", done => {
        delete userTest.email;
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Email not found");
                done();
            })
    });

    test("Should be invalid (Email empty)", done => {
        userTest.email = "";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Email field is empty");
                done();
            })
    });

    test("Should be invalid (Email invalid)", done => {
        userTest.email = "email#email.com";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Email is invalid");
                done();
            })
    });

    test("Should be invalid (no Country)", done => {
        delete userTest.country;
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Country not found");
                done();
            })
    });

    test("Should be invalid (Country empty)", done => {
        userTest.country = "";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Country field is empty");
                done();
            })
    });

    test("Should be invalid (no City)", done => {
        delete userTest.city;
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("City not found");
                done();
            })
    });

    test("Should be invalid (City empty)", done => {
        userTest.city = "";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("City field is empty");
                done();
            })
    });

    test("Should be invalid (no Gender)", done => {
        delete userTest.gender;
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Gender not found");
                done();
            })
    });

    test("Should be invalid (Gender empty)", done => {
        userTest.gender = "";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Gender field is empty");
                done();
            })
    });

    test("Should be invalid (no Birthday)", done => {
        delete userTest.birthday;
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Birthday not found");
                done();
            })
    });

    test("Should be invalid (Birthday not valid)", done => {
        userTest.birthday = "13-13-2020";
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Birthday must be a valid date");
                done();
            })
    });

    test("Should be dopple (email)", done => {
        userTest.email = otherUser.email;
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(409)
            .then(async response => {
                expect(response.body.payload).toContain("Email alrealdy exists in database");
                done();
            })
    });

    test("Should be dopple (Username)", done => {
        userTest.username = otherUser.username;
        request(app)
            .post("/v1/authorization/signup")
            .send(userTest)
            .expect(409)
            .then(async response => {
                expect(response.body.payload).toContain("Username alrealdy exists in database");
                done();
            })
    });

    


    afterEach(async () => {
        await UserMongoose.model.findOneAndDelete({
            username: userTest.username
        });
    })
    afterAll(async() => {
        await UserMongoose.model.collection.drop();
        mongoose.connection.close();
    })
})