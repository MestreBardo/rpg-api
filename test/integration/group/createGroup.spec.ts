import mongoose from 'mongoose';
import { app } from "../../../src/app";
import request from 'supertest';
import { UserMongoose } from '../../../src/database/models/User.mongoose';
import { GeneratePasswordService } from '../../../src/core/services/GeneratePassword.service';
import { GenerateJwtService } from '../../../src/core/services/GenerateJwt.service';
import { GroupMongoose } from '../../../src/database/models/Group.mongoose';
import { MemberMongoose } from '../../../src/database/models/Member.mongoose';

let userTest: any;
let group: any;
let token: any;
let changeForm: any;
const baseUrl = "/v1/groups"

describe("Test createGroup route", () => {
    beforeAll(async() => {
        await mongoose.connect(process.env.DB_URI);
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

        const otherGroup = new GroupMongoose.model({name: "otherGroup"});
        await otherGroup.save();


        token = GenerateJwtService.execute(user.toJSON());

        
    });

    beforeEach(() => {
        group = {
            name: "Teste group",
            description: "description",
            isPublic: true

        }
    })



    test("Should create group", done => {
        request(app)
            .post(baseUrl)
            .set({'authorization': `Bearer ${token}`})
            .send(group)
            .expect(201)
            .then(async response => {
                const groupDb = await GroupMongoose.model.findOne({
                    name: group.name
                });
                expect(groupDb.name).toBe(group.name);
                expect(groupDb.description).toBe(group.description);
                expect(groupDb.isPublic).toBe(group.isPublic);
                done();
            })
    });

    test("Should have dopple", done => {
        group.name = "otherGroup";
        request(app)
            .post(baseUrl)
            .set({'authorization': `Bearer ${token}`})
            .send(group)
            .expect(409)
            .then(async response => {
                expect(response.body.payload).toBe("This group name is already taken!");
                done();
            })
    });

    test("Should not create group (no name)", done => {
        delete group.name;
        request(app)
            .post(baseUrl)
            .set({'authorization': `Bearer ${token}`})
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Name not found");
                done();
            })
    });

    test("Should not create group (name empty)", done => {
        group.name = "";
        request(app)
            .post(baseUrl)
            .set({'authorization': `Bearer ${token}`})
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Name field is empty");
                done();
            })
    });

    test("Should not create group (name short)", done => {
        group.name = "ot";
        request(app)
            .post(baseUrl)
            .set({'authorization': `Bearer ${token}`})
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Name has less than 3 characters");
                done();
            })
    });

    test("Should not create group (name long) ", done => {
        group.name = "otherGroupwithagiantasticnametoseewhasthappeninthiscode";
        request(app)
            .post(baseUrl)
            .set({'authorization': `Bearer ${token}`})
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Name has more than 30 characters");
                done();
            })
    });

    test("Should not create group (no isPublic) ", done => {
        delete group.isPublic;
        request(app)
            .post(baseUrl)
            .set({'authorization': `Bearer ${token}`})
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("isPublic not found");
                done();
            })
    });

    test("Should not create group (name long) ", done => {
        group.name = "otherGroupwithagiantasticnametoseewhasthappeninthiscode";
        request(app)
            .post(baseUrl)
            .set({'authorization': `Bearer ${token}`})
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("Name has more than 30 characters");
                done();
            })
    });



    test("Should return 'authorization is not present!'", done => {
        request(app)
            .post(baseUrl)
            .send(group)
            .expect(400)
            .then(async response => {
                expect(response.body.payload).toContain("authorization is not present!");
                done();
            })
    });

    test("Should return 'authorization can't be empty'", done => {
        request(app)
            .post(baseUrl)
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
            .post(baseUrl)
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
            .post(baseUrl)
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
            .post(baseUrl)
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
            .post(baseUrl)
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
            .post(baseUrl)
            .set({'authorization': `Bearer 54548484848484`})
            .send(group)
            .expect(401)
            .then(async response => {
                expect(response.body.payload).toContain("Token is not valid");
                done();
            })
    });

    test("Should return 'User not found in database!'", done => {
        userTest._id = new mongoose.Types.ObjectId();
        token = GenerateJwtService.execute(userTest);
        request(app)
            .post(baseUrl)
            .set({'authorization': `Bearer ${token}`})
            .send(group)
            .expect(404)
            .then(async response => {
                expect(response.body.payload).toBe("User not found in database!");
                done();
            })
    });

    // test("Should invalid request (no new email)", done => {
    //     delete changeForm.email;
    //     request(app)
    //         .patch(`/v1/users/email`)
    //         .set({'authorization': `Bearer ${token}`})
    //         .send(changeForm)
    //         .expect(400)
    //         .then(async response => {

    //             expect(response.body.payload).toContain("Email not found");
    //             done();
    //         })
    // });

    // test("Should invalid request (invalid email)", done => {
    //     changeForm.email = "senior#gmail.com";
    //     request(app)
    //         .patch(`/v1/users/email`)
    //         .set({'authorization': `Bearer ${token}`})
    //         .send(changeForm)
    //         .expect(400)
    //         .then(async response => {

    //             expect(response.body.payload).toContain("Email is invalid");
    //             done();
    //         })
    // });


    // test("Should invalid request (no confirmation password)", done => {
    //     delete changeForm.confirmationPassword;
    //     request(app)
    //         .patch(`/v1/users/email`)
    //         .set({'authorization': `Bearer ${token}`})
    //         .send(changeForm)
    //         .expect(400)
    //         .then(async response => {
    //             expect(response.body.payload).toContain("Confirmation password field not found");
    //             done();
    //         })
    // });


    // test("Should have duplicity (email)", done => {
    //     changeForm.email = otherUser.email;
    //     request(app)
    //         .patch(`/v1/users/email`)
    //         .set({'authorization': `Bearer ${token}`})
    //         .send(changeForm)
    //         .expect(409)
    //         .then(async response => {
    //             expect(response.body.payload).toContain("Email alrealdy exists in database");
    //             done();
    //         })
    // });

    // test("Should token user not exist", done => {
    //     userTest._id = new mongoose.Types.ObjectId();
    //     token = GenerateJwtService.execute(userTest);
    //     request(app)
    //         .patch(baseUrl)
    //         .set({'authorization': `Bearer ${token}`})
    //         .send(group)
    //         .expect(404)
    //         .then(async response => {
    //             console.log(response.body)
    //             expect(response.body.payload).toBe("User not found in database!");
    //             done();
    //         })
    // });

   
    afterAll(async() => {
        await GroupMongoose.model.collection.drop();
        await UserMongoose.model.collection.drop();
        await MemberMongoose.model.collection.drop();
        mongoose.connection.close();
    })
})