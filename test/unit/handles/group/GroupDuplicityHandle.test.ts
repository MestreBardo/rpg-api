import { GroupDuplicity } from "../../../../src/core/handles/Group/GroupDuplicity.handle";
import { GroupRepository } from "../../../../src/database/repositories/Group.repository";

let res: any = {};
let req: any = {};
let next = jest.fn();
let mockStaticF = jest.fn().mockReturnValue('worked')


describe("Test GroupDuplicityHandle", () => {
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
        next = jest.fn();

        req = {}
    });

    test('Should not be duplicity', async () => {
        req.body = {
            name: "test group"
        }
        GroupRepository.findByName = jest.fn().mockReturnValue(null);

       
        await GroupDuplicity.handle(
            req,
            res,
            next
        )

        expect(next).toBeCalled();
    });

    test('Should return "This group name is already taken!"', async () => {
        req.body = {
            name: "test group"
        }
        GroupRepository.findByName = jest.fn().mockReturnValue({
            name: "test group"
        });

       
        await GroupDuplicity.handle(
            req,
            res,
            next
        )

        expect(res.code).toBe(409);
        expect(res.response.payload).toBe("This group name is already taken!");
    });

    test('Should return "Server have a error to process the request!"', async () => {

        req.body = {};
        await GroupDuplicity.handle(
            req,
            res,
            next
        )

        expect(res.code).toBe(500);
        expect(res.response.payload).toBe("Server have a error to process the request!");
    });


    test('Should return "Something went wrong on group find"', async () => {
        req.body = {
            name: "teste"
        }
        GroupRepository.findByName = jest.fn().mockImplementation(() => {
            throw new Error("Something went wrong on group find");
            
        });
       
        await GroupDuplicity.handle(
            req,
            res,
            next
        )

        expect(res.code).toBe(500);
        expect(res.response.payload).toBe("Something went wrong on group find");
    });
})