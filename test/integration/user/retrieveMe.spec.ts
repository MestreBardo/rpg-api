import mongoose from 'mongoose';
import { app } from "../../../src/app";
import request from 'supertest';
import { UserMongoose } from '../../../src/database/models/User.mongoose';
import { GeneratePasswordService } from '../../../src/core/services/GeneratePassword.service';
import { GenerateJwtService } from '../../../src/core/services/GenerateJwt.service';

let connection: any;
let userTest: any;
let token: any;

describe("Test RetriveMe route", () => {
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

        

        const user = new UserMongoose.model(userTest);
        await user.save();

        token = GenerateJwtService.execute(user.toJSON());
        
    })

    afterEach(async () => {
        UserMongoose.model.findOneAndDelete({
            username: "mestrebardo"
        });
    })

    test("Should return me", done => {
        request(app)
            .get("/v1/users/me")
            .set({'authorization': `Bearer ${token}`})
            .expect(200)
            .then(async response => {
                expect(response.body.payload.username).toBe(userTest.username);
                done();
            })
    });

    test("Should return 'authorization is not present!'", done => {
        request(app)
            .get("/v1/users/me")
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is not present!");
                done();
            })
    });

    test("Should return 'authorization can't be empty'", done => {
        request(app)
            .get("/v1/users/me")
            .set({'authorization': ``})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization can't be empty");
                done();
            })
    });

    test("Should be invalid authorization (no Token)", done => {
        request(app)
            .get("/v1/users/me")
            .set({'authorization': `Bearer `})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (wrong Bearer)", done => {
        request(app)
            .get("/v1/users/me")
            .set({'authorization': `Beare ${token}`})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (wrong format)", done => {
        request(app)
            .get("/v1/users/me")
            .set({'authorization': `Bearer${token}`})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (no Bearer word)", done => {
        request(app)
            .get("/v1/users/me")
            .set({'authorization': `${token}`})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid token (wrong format)", done => {
        request(app)
            .get("/v1/users/me")
            .set({'authorization': `Bearer 54548484848484`})
            .expect(401)
            .then(async response => {
                expect(response.body.payload).toContain("Token is not valid");
                done();
            })
    });

    test("Should be a valid token but without id", done => {
        token = GenerateJwtService.execute(userTest);
        request(app)
            .get("/v1/users/me")
            .set({'authorization': `Bearer ${token}`})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toBe("User not found in request");
                done();
            })
    });

    test("Should be a valid token but user not exist", done => {
        userTest._id = new mongoose.Types.ObjectId();
        token = GenerateJwtService.execute(userTest);
        request(app)
            .get("/v1/users/me")
            .set({'authorization': `Bearer ${token}`})
            .expect(404)
            .then(async response => {
                expect(response.body.payload).toBe("User not found in database");
                done();
            })
    });

   
    afterAll(async() => {
        await UserMongoose.model.collection.drop();
        mongoose.connection.close();
    })
})