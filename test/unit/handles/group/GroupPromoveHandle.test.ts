import { GroupPromove } from "../../../../src/core/handles/Group/GroupPromove.handle";
import { MemberRepository } from "../../../../src/database/repositories/Member.repository";


// jest.mock('../../../src/database/repositories/Group.repository');

let res: any = {};
let req: any = {};
let next = jest.fn();
let mockStaticF = jest.fn().mockReturnValue('worked')



describe('Test GroupPromoveHandle', () => {
    beforeAll(() => {
        res = {
            code: 0,
            response: "",
            status: function(code) {
                this.code = code;
                return this;
            },
            send: function(response) {
                this.response = response;
            }
        };

        req = {
        };
    });
    beforeEach(() => {
        mockStaticF = jest.fn().mockReturnValue('worked')

        MemberRepository.promoveUser = jest.fn().mockReturnValue({
            role: "admin",
            user: {
                _id: "4444444",
                username: "mestibard",
                email: "mestibar@hotmail.com"
            }
            
        }); 

        req = {}
    });

    test('Should return Promoted Member', async () => {

        req.otherMember = {
            _id: "4444444444444"
        }
       
        await GroupPromove.handle(
            req,
            res,
            next
        )

        expect(res.response.payload.role).toBe("admin");
        expect(res.code).toBe(200);
    });


    test("Should return 'Server have a error to process the request!'", async () => {

       
        await GroupPromove.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Server have a error to process the request!");
        expect(res.code).toBe(500);
    });


    test("Should return 'Something went wrong with promove'", async () => {

        req.otherMember = {
            _id: "4444444444444"
        }

        MemberRepository.promoveUser = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong with promove");
            
        });

        await GroupPromove.handle(
            req,
            res,
            next
        )

        expect(res.response.payload).toBe("Something went wrong with promove");
        expect(res.code).toBe(500);
    });

   
})