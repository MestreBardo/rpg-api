import mongoose from 'mongoose';
import { app } from "../../../src/app";
import request from 'supertest';
import { UserMongoose } from '../../../src/database/models/User.mongoose';
import { GeneratePasswordService } from '../../../src/core/services/GeneratePassword.service';
import { GenerateJwtService } from '../../../src/core/services/GenerateJwt.service';
import { GroupMongoose } from '../../../src/database/models/Group.mongoose';
import { MemberMongoose } from '../../../src/database/models/Member.mongoose';

let normalUser: any;
let normalMember: any;
let ownerUser: any;
let ownerMember: any;
let adminUser: any;
let adminMember: any;
let group: any;
let token: any;
let changeForm: any

const baseUrl = "/v1/groups/"

describe("Test retrieveGroup route", () => {
    beforeAll(async() => {
        await mongoose.connect(process.env.DB_URI);
        

        ownerUser = new UserMongoose.model({
            name: "vinycius",
            surname: "monteiro",
            username: "mestrebardo",
            password: await GeneratePasswordService.execute("@masterpassword"),
            email: "vinyciussilvamonteiro@gmail.com",
            country: "brasil",
            city: "rio de janeiro",
            gender: "man",
            birthday: "07-07-1995",
            groupCount: 1,
            campaignCount: 0,

        });

        await ownerUser.save();


        group = new GroupMongoose.model({
            name: "teste group",
            description: "teste description",
            isPublic: true,
            owner: ownerUser._id,
            userCount: 1,
            createdAt: new Date()
        })

        await group.save();

        ownerMember = new MemberMongoose.model({
            user: ownerUser._id,
            group: group._id,
            role: "owner",
            joinedAt: new Date()
        });


        await ownerMember.save();



        token = GenerateJwtService.execute(ownerUser.toJSON());

        
    });

  
    test("Should retrive groups", done => {
        request(app)
            .get(`${baseUrl}?name=t`)
            .set({'authorization': `Bearer ${token}`})
            .expect(200)
            .then(async response => {
                expect(response.body.payload.length).toBe(1);
                done();
            })
    });

    test("Should not retrive groups (group not found)", done => {
        request(app)
            .get(`${baseUrl}?name=z`)
            .set({'authorization': `Bearer ${token}`})
            .expect(200)
            .then(async response => {
                expect(response.body.payload.length).toBe(0);
                done();
            })
    });


   
    test("Should return 'authorization is not present!'", done => {
        request(app)
            .get(`${baseUrl}?name=z`)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is not present!");
                done();
            })
    });

    test("Should return 'authorization can't be empty'", done => {
        request(app)
            .get(`${baseUrl}?name=z`)
            .set({'authorization': ``})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization can't be empty");
                done();
            })
    });

    test("Should be invalid authorization (no Token)", done => {
        request(app)
            .get(`${baseUrl}?name=z`)
            .set({'authorization': `Bearer `})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (wrong Bearer)", done => {
        request(app)
            .get(`${baseUrl}?name=z`)
            .set({'authorization': `Beare ${token}`})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (wrong format)", done => {
        request(app)
            .get(`${baseUrl}?name=z`)
            .set({'authorization': `Bearer${token}`})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (no Bearer word)", done => {
        request(app)
            .get(`${baseUrl}?name=z`)
            .set({'authorization': `${token}`})
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid token (wrong format)", done => {
        request(app)
            .get(`${baseUrl}?name=z`)
            .set({'authorization': `Bearer 54548484848484`})
            .expect(401)
            .then(async response => {
                expect(response.body.payload).toContain("Token is not valid");
                done();
            })
    });

   
    afterAll(async() => {
        await GroupMongoose.model.collection.drop();
        await UserMongoose.model.collection.drop();
        await MemberMongoose.model.collection.drop();
        mongoose.connection.close();
    })
})