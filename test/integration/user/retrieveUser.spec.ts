import mongoose from 'mongoose';
import { app } from "../../../src/app";
import request from 'supertest';
import { UserMongoose } from '../../../src/database/models/User.mongoose';
import { GeneratePasswordService } from '../../../src/core/services/GeneratePassword.service';
import { GenerateJwtService } from '../../../src/core/services/GenerateJwt.service';

let connection: any;
let userTest: any;
let otherUser: any;
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

        const otherUserTest = {
            name: "rafael",
            surname: "brito",
            username: "blackjasck",
            password: await GeneratePasswordService.execute("@masterpassword"),
            confirmationPassword: "@masterpassword",
            email: "blackjacku@gmail.com",
            country: "brasil",
            city: "rio de janeiro",
            gender: "man",
            birthday: "07-07-1995"
        };

        

        const user = new UserMongoose.model(userTest);
        await user.save();

        otherUser = new UserMongoose.model(otherUserTest);
        await otherUser.save();

        token = GenerateJwtService.execute(user.toJSON());
        
    })

    afterEach(async () => {
        await UserMongoose.model.findOneAndDelete({
            username: "mestrebardo"
        });

        await UserMongoose.model.findOneAndDelete({
            username: "blackjasck"
        });
    })

    test("Should return a user", done => {
        request(app)
            .get(`/v1/users/${otherUser._id}`)
            .set({'authorization': `Bearer ${token}`})
            .expect(200)
            .then(async response => {
                expect(response.body.payload.username).toBe(otherUser.username);
                done();
            })
    });

    test("Should return 'authorization is not present!'", done => {
        request(app)
            .get(`/v1/users/${otherUser._id}`)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is not present!");
                done();
            })
    });

    test("Should return 'authorization can't be empty'", done => {
        request(app)
            .get(`/v1/users/${otherUser._id}`)
            .set({'authorization': ``})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization can't be empty");
                done();
            })
    });

    test("Should be invalid authorization (no Token)", done => {
        request(app)
            .get(`/v1/users/${otherUser._id}`)
            .set({'authorization': `Bearer `})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (wrong Bearer)", done => {
        request(app)
            .get(`/v1/users/${otherUser._id}`)
            .set({'authorization': `Beare ${token}`})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (wrong format)", done => {
        request(app)
            .get(`/v1/users/${otherUser._id}`)
            .set({'authorization': `Bearer${token}`})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (no Bearer word)", done => {
        request(app)
            .get(`/v1/users/${otherUser._id}`)
            .set({'authorization': `${token}`})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid token (wrong format)", done => {
        request(app)
            .get(`/v1/users/${otherUser._id}`)
            .set({'authorization': `Bearer 54548484848484`})
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
            .get(`/v1/users/da5d4s54d54da54sa5`)
            .set({'authorization': `Bearer ${token}`})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("This id is not valid");
                done();
            })
    });

    test("Should not found a user", done => {
        const _id = new mongoose.Types.ObjectId();
        token = GenerateJwtService.execute(userTest);
        request(app)
            .get(`/v1/users/${_id}`)
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