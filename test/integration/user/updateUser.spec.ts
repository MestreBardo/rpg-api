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

describe("Test updateUser route", () => {
    beforeAll(async() => {
        await mongoose.connect(process.env.DB_URI);

        
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
            name: "carlos",
            surname: "montoia",
            country: "united states",
            city: "chicago",
            gender: "man",
            birthday: "10-10-1999",
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

    test("Should update user", done => {
        request(app)
            .put(`/v1/users`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(200)
            .then(async response => {
                const userDb = await UserMongoose.model.findOne({
                    username: userTest.username
                });
                expect(userDb.name).toBe(changeForm.name);
                expect(userDb.surname).toBe(changeForm.surname);
                expect(userDb.country).toBe(changeForm.country);
                expect(userDb.city).toBe(changeForm.city);
                expect(userDb.gender).toBe(changeForm.gender);
                expect(new Date(userDb.birthday).toISOString()).toBe(new Date(changeForm.birthday).toISOString());
                done();
            })

    });

    test("Should return 'authorization is not present!'", done => {
        request(app)
            .put(`/v1/users`)
            .send(changeForm)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is not present!");
                done();
            })
    });

    test("Should return 'authorization can't be empty'", done => {
        request(app)
            .put(`/v1/users`)
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
            .put(`/v1/users`)
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
            .put(`/v1/users`)
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
            .put(`/v1/users`)
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
            .put(`/v1/users`)
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
            .put(`/v1/users`)
            .set({'authorization': `Bearer 54548484848484`})
            .send(changeForm)
            .expect(401)
            .then(async response => {
                expect(response.body.payload).toContain("Token is not valid");
                done();
            })
    });

  

    test("Should invalid request (short name)", done => {
        changeForm.name = "sr";
        request(app)
            .put(`/v1/users`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {

                expect(response.body.payload).toContain("Name has less than 3 characters");
                done();
            })
    });

    test("Should invalid request (long name)", done => {
        changeForm.name = "soloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooonnnnnnnnnnnguser";
        request(app)
            .put(`/v1/users`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {

                expect(response.body.payload).toContain("Name has more than 30 characters");
                done();
            })
    });



    test("Should invalid request (short surname)", done => {
        changeForm.surname = "sr";
        request(app)
            .put(`/v1/users`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {

                expect(response.body.payload).toContain("Surname has less than 3 characters");
                done();
            })
    });

    test("Should invalid request (long surname)", done => {
        changeForm.surname = "solooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooonnnnnnnnnnnguser";
        request(app)
            .put(`/v1/users`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {

                expect(response.body.payload).toContain("Surname has more than 50 characters");
                done();
            })
    });



    test("Should invalid request (no confirmation password)", done => {
        delete changeForm.confirmationPassword;
        request(app)
            .put(`/v1/users`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Confirmation password field not found");
                done();
            })
    });



    test("Should token user not exist", done => {
        userTest._id = new mongoose.Types.ObjectId();
        token = GenerateJwtService.execute(userTest);
        request(app)
            .put(`/v1/users`)
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