import mongoose from 'mongoose';
import { app } from "../../../src/app";
import request from 'supertest';
import { UserMongoose } from '../../../src/database/models/User.mongoose';
import { GeneratePasswordService } from '../../../src/core/services/GeneratePassword.service';
import { GenerateJwtService } from '../../../src/core/services/GenerateJwt.service';

let userTest: any;
let otherUser: any;
let token: any;
let changeForm: any;

describe("Test updateUsername route", () => {
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

    beforeEach(async() => {
        userTest = {
            name: "vinycius",
            surname: "monteiro",
            username: "mestrebardo",
            password: await GeneratePasswordService.execute("@masterpassword"),
            confirmationPassword: "@masterpassword",
            email: "vinyciussilvamonteiro@gmail.com",
            country: "brasil",
            city: "rio de janeiro",
            gender: "man",
            birthday: "07-07-1995"
        };

        changeForm = {
            username: "mestrebardoax",
            confirmationPassword: "@masterpassword"
        }

        const user = new UserMongoose.model(userTest);
        await user.save();

        token = GenerateJwtService.execute(user.toJSON());
        
    })

    afterEach(async () => {
        await UserMongoose.model.findOneAndDelete({
            username: "mestrebardo"
        });
    })

    test("Should change username", done => {
        request(app)
            .patch(`/v1/users/username`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(200)
            .then(async response => {
                const userDb = await UserMongoose.model.findOne({
                    username: changeForm.username
                });
                expect(userDb.username).toBe(changeForm.username);
                done();
            })
    });

    test("Should return 'authorization is not present!'", done => {
        request(app)
            .get(`/v1/users/username`)
            .send(changeForm)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is not present!");
                done();
            })
    });

    test("Should return 'authorization can't be empty'", done => {
        request(app)
            .get(`/v1/users/username`)
            .set({'authorization': ``})
            .send(changeForm)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization can't be empty");
                done();
            })
    });

    test("Should be invalid authorization (no Token)", done => {
        request(app)
            .get(`/v1/users/username`)
            .set({'authorization': `Bearer `})
            .send(changeForm)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (wrong Bearer)", done => {
        request(app)
            .get(`/v1/users/username`)
            .set({'authorization': `Beare ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (wrong format)", done => {
        request(app)
            .get(`/v1/users/username`)
            .set({'authorization': `Bearer${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (no Bearer word)", done => {
        request(app)
            .get(`/v1/users/username`)
            .set({'authorization': `${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid token (wrong format)", done => {
        request(app)
            .get(`/v1/users/username`)
            .set({'authorization': `Bearer 54548484848484`})
            .send(changeForm)
            .expect(401)
            .then(async response => {
                expect(response.body.payload).toContain("Token is not valid");
                done();
            })
    });

    test("Should return 'This id is not valid'", done => {
        const _id = new mongoose.Types.ObjectId();
        token = GenerateJwtService.execute(userTest);
        request(app)
            .get(`/v1/users/username`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("This id is not valid");
                done();
            })
    });

    test("Should invalid request (no new username)", done => {
        delete changeForm.username;
        request(app)
            .patch(`/v1/users/username`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {

                expect(response.body.payload).toContain("Username not found");
                done();
            })
    });

    test("Should invalid request (short username)", done => {
        changeForm.username = "sr";
        request(app)
            .patch(`/v1/users/username`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {

                expect(response.body.payload).toContain("Username has less than 3 characters");
                done();
            })
    });

    test("Should invalid request (long username)", done => {
        changeForm.username = "soloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooonnnnnnnnnnnguser";
        request(app)
            .patch(`/v1/users/username`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {

                expect(response.body.payload).toContain("Username has more than 30 characters");
                done();
            })
    });

    test("Should invalid request (especial character username)", done => {
        changeForm.username = "n@wuser";
        request(app)
            .patch(`/v1/users/username`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {

                expect(response.body.payload).toContain("Username not accept space and special characters");
                done();
            })
    });

    test("Should invalid request (space character username)", done => {
        changeForm.username = "n@w user";
        request(app)
            .patch(`/v1/users/username`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {

                expect(response.body.payload).toContain("Username not accept space and special characters");
                done();
            })
    });

    test("Should invalid request (no confirmation password)", done => {
        delete changeForm.confirmationPassword;
        request(app)
            .patch(`/v1/users/username`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Confirmation password field not found");
                done();
            })
    });


    test("Should have duplicity (username)", done => {
        changeForm.email = otherUser.username;
        request(app)
            .patch(`/v1/users/username`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(409)
            .then(async response => {
                expect(response.body.payload).toContain("Username alrealdy exists in database");
                done();
            })
    });

    test("Should token user not exist", done => {
        userTest._id = new mongoose.Types.ObjectId();
        token = GenerateJwtService.execute(userTest);
        request(app)
            .patch(`/v1/users/username`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(404)
            .then(async response => {
                expect(response.body.payload).toBe("User not found in database!");
                done();
            })
    });

   
    afterAll(async() => {
        await UserMongoose.model.collection.drop();
        mongoose.connection.close();
    })
})