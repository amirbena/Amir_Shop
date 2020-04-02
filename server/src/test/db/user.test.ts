import mocha, { beforeEach, before, after, it, describe } from "mocha";
import chai, { expect,should } from 'chai';
import User from '../../db/models/user.model';
import HTTP_STATUS from '../../common/HTTP_Enum';
let database: any;

describe("User Model testing", () => {
    before(() => {
        database = require('../index');
    })
    describe("Testing POST /:", () => {
        const jwtKey = process.env.jwtPrivateKey;
        beforeEach(async () => {
            await User.create({
                fullName: 'Ron Cohen',
                address: 'Ben Gurion 99, Bat-yam',
                email: 'roncohen@gmail.com',
                password: '123456'
            })
            await User.create({
                fullName: 'David Levi',
                address: 'Ben Gurion 109, Bat-yam',
                email: 'davidlevi@gmail.com',
                password: '123456'
            })
            await User.create({
                fullName: 'Tal Leon',
                address: 'Harav Maimon 15, Bat-yam',
                email: 'tal222881@gmail.com',
                password: 'talleon'
            })
        })
        afterEach(async () => {
            await User.deleteMany({});
        })

        it('should get status of BAD_REQUEST of wrong object', async () => {
            const object = {
                fullName: '',
                address: 44,
                email: '1333o3',
                password: true
            };
            const result = await database.Services.UserService.createUser(object, jwtKey);
            expect(result.status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
        })
    })
}
);