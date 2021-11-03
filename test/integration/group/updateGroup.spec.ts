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

describe("Test updateGroup route", () => {
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

        adminUser = new UserMongoose.model({
            name: "rafael",
            surname: "brito",
            username: "blackjacku",
            password: await GeneratePasswordService.execute("@masterpassword"),
            email: "blackjacku@gmail.com",
            country: "brasil",
            city: "rio de janeiro",
            gender: "man",
            birthday: "07-07-1995",
            groupCount: 1,
            campaignCount: 0,

        });

        normalUser = new UserMongoose.model({
            name: "pedro",
            surname: "farias",
            username: "destructu",
            password: await GeneratePasswordService.execute("@masterpassword"),
            email: "destructu@gmail.com",
            country: "brasil",
            city: "rio de janeiro",
            gender: "man",
            birthday: "07-07-1995",
            groupCount: 1,
            campaignCount: 0,

        });

        await ownerUser.save();
        await adminUser.save();
        await normalUser.save();

        group = new GroupMongoose.model({
            name: "teste group",
            description: "teste description",
            isPublic: true,
            owner: ownerUser._id,
            userCount: 3,
            createdAt: new Date()
        })

        await group.save();

        ownerMember = new MemberMongoose.model({
            user: ownerUser._id,
            group: group._id,
            role: "owner",
            joinedAt: new Date()
        });

        adminMember = new MemberMongoose.model({
            user: adminUser._id,
            group: group._id,
            role: "admin",
            joinedAt: new Date()
        });

        normalMember = new MemberMongoose.model({
            user: normalUser._id,
            group: group._id,
            role: "user",
            joinedAt: new Date()
        });

        await ownerMember.save();
        await adminMember.save();
        await normalMember.save();


        const otherGroup = new GroupMongoose.model({name: "otherGroup"});
        await otherGroup.save();


        token = GenerateJwtService.execute(ownerUser.toJSON());

        
    });

    beforeEach(async () => {
        

        token = GenerateJwtService.execute(ownerUser.toJSON());

        await GroupMongoose.model.findByIdAndUpdate(
            group._id,
            {
                $set: {
                    description: group.description
                }
            }
        )

        changeForm = {
            description: "description",
        }
    })



    test("Should update group (owner)", done => {
        request(app)
            .put(`${baseUrl}${group._id}`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(200)
            .then(async response => {
                const groupDb = await GroupMongoose.model.findOne({
                    name: group.name
                });
                expect(groupDb.description).toBe(changeForm.description);
                done();
            })
    });

    test("Should update group (admin)", done => {
        token = GenerateJwtService.execute(adminUser.toJSON());
        request(app)
            .put(`${baseUrl}${group._id}`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(200)
            .then(async response => {
                const groupDb = await GroupMongoose.model.findOne({
                    name: group.name
                });
                expect(groupDb.description).toBe(changeForm.description);
                done();
            })
    });

    test("Should can't change (user)", done => {
        token = GenerateJwtService.execute(normalUser.toJSON());
        request(app)
            .put(`${baseUrl}${group._id}`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(401)
            .then(async response => {
                expect(response.body.payload).toBe("You dont have permission to do this.");
                done();
            })
    });



    test("Should return 'authorization is not present!'", done => {
        request(app)
            .put(`${baseUrl}${group._id}`)
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is not present!");
                done();
            })
    });

    test("Should return 'authorization can't be empty'", done => {
        request(app)
            .put(`${baseUrl}${group._id}`)
            .set({'authorization': ``})
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization can't be empty");
                done();
            })
    });

    test("Should be invalid authorization (no Token)", done => {
        request(app)
            .put(`${baseUrl}${group._id}`)
            .set({'authorization': `Bearer `})
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (wrong Bearer)", done => {
        request(app)
            .put(`${baseUrl}${group._id}`)
            .set({'authorization': `Beare ${token}`})
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (wrong format)", done => {
        request(app)
            .put(`${baseUrl}${group._id}`)
            .set({'authorization': `Bearer${token}`})
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid authorization (no Bearer word)", done => {
        request(app)
            .put(`${baseUrl}${group._id}`)
            .set({'authorization': `${token}`})
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is invalid");
                done();
            })
    });

    test("Should be invalid token (wrong format)", done => {
        request(app)
            .put(`${baseUrl}${group._id}`)
            .set({'authorization': `Bearer 54548484848484`})
            .send(group)
            .expect(401)
            .then(async response => {
                expect(response.body.payload).toContain("Token is not valid");
                done();
            })
    });

    test("Should return 'User not found in database!'", done => {
        const userTest = {
            _id: new mongoose.Types.ObjectId()
        };
        token = GenerateJwtService.execute(userTest);
        request(app)
            .put(`${baseUrl}${group._id}`)
            .set({'authorization': `Bearer ${token}`})
            .send(changeForm)
            .expect(404)
            .then(async response => {
                expect(response.body.payload).toBe("User not found in database!");
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