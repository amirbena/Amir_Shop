import { beforeEach, afterEach, it, describe } from "mocha";
import bcrypt from 'bcrypt';
import { expect } from 'chai';
import iterableArray from '../../common/iterableArray';
import User,{ IUser } from '../../db/models/user.model';
import HTTP_STATUS from '../../common/HTTP_Enum';
import database from '../../db/index';
import userModel from '../../db/models/user.model';


const jwtKey: string = (process.env.jwtPrivateKey as string);
describe("User Model testing", () => {

    describe("Testing POST /: -createUser()", () => {
        beforeEach(async () => {
            const passwords = ['123456', '123456', 'talleon'];
            const salt = await bcrypt.genSalt(20);
            const encryptedPasswords: string[] = [];
            let password;
            for await (password of iterableArray(passwords)) {
                const encrypted = await bcrypt.hash(password, salt);
                encryptedPasswords.push(encrypted);
            }
            await User.create({
                fullName: 'Ron Cohen',
                address: 'Ben Gurion 99, Bat-yam',
                email: 'roncohen@gmail.com',
                password: encryptedPasswords[0]
            })
            await User.create({
                fullName: 'David Levi',
                address: 'Ben Gurion 109, Bat-yam',
                email: 'davidlevi@gmail.com',
                password: encryptedPasswords[1]
            })
            await User.create({
                fullName: 'Tal Leon',
                address: 'Harav Maimon 15, Bat-yam',
                email: 'tal222881@gmail.com',
                password: encryptedPasswords[2]
            })
        })
        afterEach(async () => {
            await User.deleteMany({});
        })

        it('should get status of BAD_REQUEST of wrong object', async () => {
            const object = {
                fullName: '',
                address: 'hh',
                email: '1333o3',
                password: "aa"
            };
            const { status } = await database.Services.UserService.createUser(object, jwtKey);
            expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
        })
        it('should get status of BAD_REQUEST of found user in db', async () => {
            const object = {
                fullName: 'David Levi',
                address: 'Ben Gurion 109, Bat-yam',
                email: 'davidlevi@gmail.com',
                password: '123456'
            }
            const { status } = await database.Services.UserService.createUser(object, jwtKey);
            expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
        })
        it('should get status OK  and return token not empty ', async () => {
            const object = {
                fullName: 'Amir Benassayag',
                address: 'agnon6, Bat-yam',
                email: 'amir12061968@gmail.com',
                password: '123456'
            }
            const { status, token } = await database.Services.UserService.createUser(object, jwtKey);
            expect(status).to.be.equal(HTTP_STATUS.OK);
            expect(token).to.be.not.equal('');
        })
    })
    describe('Testing PUT /: -makeuserAdmin()', () => {
        beforeEach(async () => {
            const passwords = ['123456', '123456', 'talleon'];
            const salt = await bcrypt.genSalt(20);
            const encryptedPasswords: string[] = [];
            let password;
            for await (password of iterableArray(passwords)) {
                const encrypted = await bcrypt.hash(password, salt);
                encryptedPasswords.push(encrypted);
            }
            await User.create({
                fullName: 'Ron Cohen',
                address: 'Ben Gurion 99, Bat-yam',
                email: 'roncohen@gmail.com',
                password: encryptedPasswords[0]
            })
            await User.create({
                fullName: 'David Levi',
                address: 'Ben Gurion 109, Bat-yam',
                email: 'davidlevi@gmail.com',
                password: encryptedPasswords[1]
            })
            await User.create({
                fullName: 'Tal Leon',
                address: 'Harav Maimon 15, Bat-yam',
                email: 'tal222881@gmail.com',
                password: encryptedPasswords[2]
            })
        })
        afterEach(async () => {
            await User.deleteMany({});
        })
        it('should get BAD_REQUEST if input is empty', async () => {
            const { status } = await database.Services.UserService.makeUserAdmin('');
            expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
        })
        it('should get status of NOT_FOUND if user doesn\'t exist in db', async () => {
            const { status } = await database.Services.UserService.makeUserAdmin("ABCDRE116789");
            expect(status).to.be.equal(HTTP_STATUS.NOT_FOUND);
        })
        it('should get status of OK if user changed mode to admin', async () => {
            const userPoped = await userModel.findOne({ fullName: "Tal Leon" });
            const user = (userPoped as IUser);
            const { status } = await database.Services.UserService.makeUserAdmin(user._id);
            expect(status).to.be.equal(HTTP_STATUS.OK);
        });
    })
    describe('Testing GET/: ->userLogin()', () => {
        beforeEach(async () => {
            const passwords = ['123456', '123456', 'talleon'];
            const salt = await bcrypt.genSalt(20);
            const encryptedPasswords: string[] = [];
            let password;
            for await (password of iterableArray(passwords)) {
                const encrypted = await bcrypt.hash(password, salt);
                encryptedPasswords.push(encrypted);
            }
            await User.create({
                fullName: 'Ron Cohen',
                address: 'Ben Gurion 99, Bat-yam',
                email: 'roncohen@gmail.com',
                password: encryptedPasswords[0]
            })
            await User.create({
                fullName: 'David Levi',
                address: 'Ben Gurion 109, Bat-yam',
                email: 'davidlevi@gmail.com',
                password: encryptedPasswords[1]
            })
            await User.create({
                fullName: 'Tal Leon',
                address: 'Harav Maimon 15, Bat-yam',
                email: 'tal222881@gmail.com',
                password: encryptedPasswords[2]
            })
        })
        afterEach(async () => {
            await User.deleteMany({});
        })
        it('should return BAD_REQUEST if input invalid', async () => {
            const loginSchema = {
                email: "amrrr",
                password: "124"
            };
            const { status } = await database.Services.UserService.userLogin(loginSchema, jwtKey);
            expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
        })
        it('should return NOT_FOUND if data if email is exist in DB', async () => {
            const loginSchema = {
                email: "amir12061968@gmail.com",
                password: "ABCDEFG"
            }
            const { status } = await database.Services.UserService.userLogin(loginSchema, jwtKey);
            expect(status).to.be.equal(HTTP_STATUS.NOT_FOUND);
        })
        it('should return NOT_FOUND if data if password doesn\'t match ', async () => {
            const loginSchema = {
                email: 'tal222881@gmail.com',
                password: "ABCDEFG"
            }
            const { status } = await database.Services.UserService.userLogin(loginSchema, jwtKey);
            expect(status).to.be.equal(HTTP_STATUS.NOT_FOUND);
        })
        it('should return OK if user login is valid', async () => {
            const userResult = await userModel.findOne({ fullName: "Tal Leon" });
            if (!userResult) {
                expect(userResult).be.equal(undefined);
            }
            const user = (userResult as IUser);
            const password = "talleon";
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                return;
            }
            const loginSchema = {
                email: "tal222881@gmail.com",
                password: user.password
            }
            const { status } = await database.Services.UserService.userLogin(loginSchema, jwtKey);
            expect(status).to.be.equal(HTTP_STATUS.OK);
        })
    })
    describe('PUT/: updateUser', () => {
        const detailsToUpdate = {
            address: 'Hashalom 67, Tel-Aviv'
        }
        beforeEach(async () => {
            const passwords = ['123456', '123456', 'talleon'];
            const salt = await bcrypt.genSalt(20);
            const encryptedPasswords: string[] = [];
            let password;
            for await (password of iterableArray(passwords)) {
                const encrypted = await bcrypt.hash(password, salt);
                encryptedPasswords.push(encrypted);
            }
            await User.create({
                fullName: 'Ron Cohen',
                address: 'Ben Gurion 99, Bat-yam',
                email: 'roncohen@gmail.com',
                password: encryptedPasswords[0]
            })
            await User.create({
                fullName: 'David Levi',
                address: 'Ben Gurion 109, Bat-yam',
                email: 'davidlevi@gmail.com',
                password: encryptedPasswords[1]
            })
            await User.create({
                fullName: 'Tal Leon',
                address: 'Harav Maimon 15, Bat-yam',
                email: 'tal222881@gmail.com',
                password: encryptedPasswords[2]
            })
        })
        afterEach(async () => {
            await User.deleteMany({});
        })
        it('should get BAD_REQUEST if input is empty', async () => {
            const { status } = await database.Services.UserService.updateUser('', detailsToUpdate);
            expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
        })
        it('should get NOT_FOUND if user is not found into db', async () => {
            const { status } = await database.Services.UserService.updateUser('ABCDEF12355', detailsToUpdate);
            expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
        })
        it('should get status OK if update is Succceed', async () => {
            const userResult = await userModel.findOne({ fullName: "Tal Leon" });
            if (!userResult) {
                expect(userResult).be.equal(undefined);
            }
            const user = (userResult as IUser);
            const { status } = await database.Services.UserService.updateUser(user.id, detailsToUpdate);
            expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
        })
    })
    describe("GET/: GETALLUSERS", () => {
        beforeEach(async () => {
            const passwords = ['123456', '123456', 'talleon'];
            const salt = await bcrypt.genSalt(20);
            const encryptedPasswords: string[] = [];
            let password;
            for await (password of iterableArray(passwords)) {
                const encrypted = await bcrypt.hash(password, salt);
                encryptedPasswords.push(encrypted);
            }
            await User.create({
                fullName: 'Ron Cohen',
                address: 'Ben Gurion 99, Bat-yam',
                email: 'roncohen@gmail.com',
                password: encryptedPasswords[0]
            })
            await User.create({
                fullName: 'David Levi',
                address: 'Ben Gurion 109, Bat-yam',
                email: 'davidlevi@gmail.com',
                password: encryptedPasswords[1]
            })
            await User.create({
                fullName: 'Tal Leon',
                address: 'Harav Maimon 15, Bat-yam',
                email: 'tal222881@gmail.com',
                password: encryptedPasswords[2]
            })
        })
        afterEach(async () => {
            await User.deleteMany({});
        })
        it('should return list of 0 users', async () => {
            await User.deleteMany({});
            const users = await database.Services.UserService.getAllUsers();
            expect(users).length(0);
        })
        it('should return list of all users', async () => {
            const users = await database.Services.UserService.getAllUsers();
            expect(users).length(3);
            expect(users[0]).haveOwnProperty("fullName", "Ron Cohen");
        })
    })
    describe("DELETE/: users", () => {
        beforeEach(async () => {
            const passwords = ['123456', '123456', 'talleon'];
            const salt = await bcrypt.genSalt(20);
            const encryptedPasswords: string[] = [];
            let password;
            for await (password of iterableArray(passwords)) {
                const encrypted = await bcrypt.hash(password, salt);
                encryptedPasswords.push(encrypted);
            }
            await User.create({
                fullName: 'Ron Cohen',
                address: 'Ben Gurion 99, Bat-yam',
                email: 'roncohen@gmail.com',
                password: encryptedPasswords[0]
            })
            await User.create({
                fullName: 'David Levi',
                address: 'Ben Gurion 109, Bat-yam',
                email: 'davidlevi@gmail.com',
                password: encryptedPasswords[1]
            })
            await User.create({
                fullName: 'Tal Leon',
                address: 'Harav Maimon 15, Bat-yam',
                email: 'tal222881@gmail.com',
                password: encryptedPasswords[2]
            })
        })
        afterEach(async () => {
            await User.deleteMany({});
        })
        it('should return BAD_REQUEST status', async () => {
            const { status } = await database.Services.UserService.deleteUser("");
            expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
        })
        it('should return NOT_FOUND status', async () => {
            const { status } = await database.Services.UserService.deleteUser("A5123456");
            expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
        })
        it('should  return status OK , and delete Tal Leon user', async () => {
            const user = await User.findOne({ fullName: "Tal Leon" });
            const { status } = await database.Services.UserService.deleteUser((user as IUser)._id);
            expect(status).to.be.equal(HTTP_STATUS.OK);
            const result = await User.findById((user as IUser)._id);
            expect(result).to.be.equal(null);
        })
    })
});