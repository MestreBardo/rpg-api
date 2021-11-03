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
            password: "@otherPassword",
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

    test("Should change password", done => {
        request(app)
            .patch(`/v1/users/password`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(200, done)

    });

    test("Should return 'authorization is not present!'", done => {
        request(app)
            .patch(`/v1/users/password`)
            .send(changeForm)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is not present!");
                done();
            })
    });

    test("Should return 'authorization can't be empty'", done => {
        request(app)
            .patch(`/v1/users/password`)
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
            .patch(`/v1/users/password`)
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
            .patch(`/v1/users/password`)
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
            .patch(`/v1/users/password`)
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
            .patch(`/v1/users/password`)
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
            .patch(`/v1/users/password`)
            .set({'authorization': `Bearer 54548484848484`})
            .send(changeForm)
            .expect(401)
            .then(async response => {
                expect(response.body.payload).toContain("Token is not valid");
                done();
            })
    });

    test("Should invalid request (no new password)", done => {
        delete changeForm.password;
        request(app)
            .patch(`/v1/users/password`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {

                expect(response.body.payload).toContain("Password not found");
                done();
            })
    });

    test("Should invalid request (short password)", done => {
        changeForm.password = "sr";
        request(app)
            .patch(`/v1/users/password`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {

                expect(response.body.payload).toContain("Password has less than 6 characters");
                done();
            })
    });

    test("Should invalid request (long password)", done => {
        changeForm.password = "soloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooonnnnnnnnnnnguser";
        request(app)
            .patch(`/v1/users/password`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(400)
            .then(async response => {

                expect(response.body.payload).toContain("Password has more than 30 characters");
                done();
            })
    });


    test("Should invalid request (no confirmation password)", done => {
        delete changeForm.confirmationPassword;
        request(app)
            .patch(`/v1/users/password`)
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
            .patch(`/v1/users/password`)
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