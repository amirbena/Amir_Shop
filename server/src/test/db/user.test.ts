import { Types } from 'mongoose';
import { beforeEach, afterEach, it, describe } from "mocha";
import bcrypt from 'bcrypt';
import { expect } from 'chai';
import config from 'config';
import mochaAsync from '../mochaAsync';
import iterableArray from '../../common/iterableArray';
import User, { IUser } from '../../db/models/user.model';
import { OK, BAD_REQUEST, NOT_FOUND } from 'http-status-codes';

import database from '../../db/index';
import userModel from '../../db/models/user.model';


describe("User Model testing", () => {
    const jwtKey: string = config.get("jwtPrivateKey");
    describe("Testing POST /: -createUser()", () => {
        beforeEach(mochaAsync(async () => {
            const passwords = ['123456', '123456', 'talleon'];
            const salt = await bcrypt.genSalt();
            const encryptedPasswords: string[] = [];
            let password;
            const iterablePasswords = await iterableArray(passwords);
            for await (password of iterablePasswords) {
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
        }));
        afterEach(mochaAsync(async () => {
            await User.deleteMany({});
        }))

        it('should get status of BAD_REQUEST of wrong object', mochaAsync(async () => {
            const object = {
                fullName: '',
                address: 'hh',
                email: '1333o3',
                password: "aa"
            };
            const { status } = await database.Services.UserService.createUser(object, jwtKey);
            expect(status).to.be.equal(BAD_REQUEST);
        }))
        it('should get status of BAD_REQUEST of found user in db', mochaAsync(async () => {
            const object = {
                fullName: 'David Levi',
                address: 'Ben Gurion 109, Bat-yam',
                email: 'davidlevi@gmail.com',
                password: '123456'
            }
            const { status } = await database.Services.UserService.createUser(object, jwtKey);
            expect(status).to.be.equal(BAD_REQUEST);
        }));
        it('should get status OK  and return token not empty ', mochaAsync(async () => {
            const object = {
                fullName: 'Amir Benassayag',
                address: 'agnon6, Bat-yam',
                email: 'amir12061968@gmail.com',
                password: '123456'
            }
            const { status, token } = await database.Services.UserService.createUser(object, jwtKey);
            expect(status).to.be.equal(OK);
            expect(token).to.be.not.equal('');
        }))
    })
    describe('Testing PUT /: -makeuserAdmin()', () => {
        beforeEach(mochaAsync(async () => {
            const passwords = ['123456', '123456', 'talleon'];
            const salt = await bcrypt.genSalt();
            const encryptedPasswords: string[] = [];
            let password;
            const iterablePasswords = await iterableArray(passwords);
            for await (password of iterablePasswords) {
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
        }));
        afterEach(mochaAsync(async () => {
            await User.deleteMany({});
        }))

        it('should get BAD_REQUEST if input is empty', mochaAsync(async () => {
            const { status } = await database.Services.UserService.makeUserAdmin('');
            expect(status).to.be.equal(BAD_REQUEST);
        }));
        it('should get status of NOT_FOUND if user doesn\'t exist in db', mochaAsync(async () => {
            const { status } = await database.Services.UserService.makeUserAdmin("ABCDRE116789");
            expect(status).to.be.equal(NOT_FOUND);
        }));
        it('should get status of OK if user changed mode to admin', mochaAsync(async () => {
            const userPoped = await userModel.findOne({ fullName: "Tal Leon" });
            const user = (userPoped as IUser);
            const { status } = await database.Services.UserService.makeUserAdmin(user._id);
            expect(status).to.be.equal(OK);
        }));
    })
    describe('Testing GET/: ->userLogin()', () => {
        beforeEach(mochaAsync(async () => {
            const passwords = ['123456', '123456', 'talleon'];
            const salt = await bcrypt.genSalt();
            const encryptedPasswords: string[] = [];
            let password;
            const iterablePasswords = await iterableArray(passwords);
            for await (password of iterablePasswords) {
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
        }));
        afterEach(mochaAsync(async () => {
            await User.deleteMany({});
        }))

        it('should return BAD_REQUEST if input invalid', mochaAsync(async () => {
            const loginSchema = {
                email: "amrrr",
                password: "124"
            };
            const { status } = await database.Services.UserService.userLogin(loginSchema, jwtKey);
            expect(status).to.be.equal(BAD_REQUEST);
        }));
        it('should return NOT_FOUND if data if email is exist in DB', mochaAsync(async () => {
            const loginSchema = {
                email: "amir12061968@gmail.com",
                password: "ABCDEFG"
            }
            const { status } = await database.Services.UserService.userLogin(loginSchema, jwtKey);
            expect(status).to.be.equal(NOT_FOUND);
        }))
        it('should return NOT_FOUND if data if password doesn\'t match', mochaAsync(async () => {
            const loginSchema = {
                email: 'tal222881@gmail.com',
                password: "ABCDEFG"
            }
            const { status } = await database.Services.UserService.userLogin(loginSchema, jwtKey);
            expect(status).to.be.equal(NOT_FOUND);
        }))
        it('should return OK if user login is valid', mochaAsync(async () => {
            const loginSchema = {
                email: "tal222881@gmail.com",
                password: "talleon"
            }
            const { status } = await database.Services.UserService.userLogin(loginSchema, jwtKey);
            expect(status).to.be.equal(OK);
        }));
    })
    describe('PUT/: updateUser', () => {
        const detailsToUpdate = {
            address: 'Hashalom 67, Tel-Aviv'
        }
        beforeEach(mochaAsync(async () => {
            const passwords = ['123456', '123456', 'talleon'];
            const salt = await bcrypt.genSalt();
            const encryptedPasswords: string[] = [];
            let password;
            const iterablePasswords = await iterableArray(passwords);
            for await (password of iterablePasswords) {
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
        }));
        afterEach(mochaAsync(async () => {
            await User.deleteMany({});
        }))

        it('should get BAD_REQUEST if input is empty', mochaAsync(async () => {
            const { status } = await database.Services.UserService.updateUser(undefined, detailsToUpdate);
            expect(status).to.be.equal(BAD_REQUEST);
        }));
        it('should get NOT_FOUND if user is not found into db', mochaAsync(async () => {
            const { status } = await database.Services.UserService.updateUser(Types.ObjectId(), detailsToUpdate);
            expect(status).to.be.equal(NOT_FOUND);
        }));
        it('should get status OK if update is Succceed', mochaAsync(async () => {
            const userResult = await userModel.findOne({ fullName: "Tal Leon" });
            const user = (userResult as IUser);
            const { status } = await database.Services.UserService.updateUser(user._id, detailsToUpdate);
            expect(status).to.be.equal(OK);
        }));
    })
    describe("GET/: GETALLUSERS", () => {
        beforeEach(mochaAsync(async () => {
            const passwords = ['123456', '123456', 'talleon'];
            const salt = await bcrypt.genSalt();
            const encryptedPasswords: string[] = [];
            let password;
            const iterablePasswords = await iterableArray(passwords);
            for await (password of iterablePasswords) {
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
        }));
        afterEach(mochaAsync(async () => {
            await User.deleteMany({});
        }))

        it('should return list of 0 users', mochaAsync(async () => {
            try {
                await User.deleteMany({});
                const users = await database.Services.UserService.getAllUsers();
                expect(users).length(0);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) {
                // tslint:disable-next-line: no-console
                console.log((ex as Error).message)
            }
        }));
        it('should return list of all users', mochaAsync(async () => {
            const users = await database.Services.UserService.getAllUsers();
            expect(users).length(3);
            expect(users[0]).property("fullName", "Ron Cohen");
        }));
    })
    describe("DELETE/:", () => {
        beforeEach(mochaAsync(async () => {
            const passwords = ['123456', '123456', 'talleon'];
            const salt = await bcrypt.genSalt();
            const encryptedPasswords: string[] = [];
            let password;
            const iterablePasswords = await iterableArray(passwords);
            for await (password of iterablePasswords) {
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
        }));
        afterEach(mochaAsync(async () => {
            await User.deleteMany({});
        }))

        it('should return BAD_REQUEST status', mochaAsync(async () => {
            const { status } = await database.Services.UserService.deleteUser("");
            expect(status).to.be.equal(BAD_REQUEST);
        }));
        it('should return NOT_FOUND status', mochaAsync(async () => {
            const { status } = await database.Services.UserService.deleteUser(Types.ObjectId());
            expect(status).to.be.equal(NOT_FOUND);
        }));
        it('should  return status OK , and delete Tal Leon user', mochaAsync(async () => {
            const user = await User.findOne({ fullName: "Tal Leon" });
            const { status } = await database.Services.UserService.deleteUser((user as IUser)._id);
            expect(status).to.be.equal(OK);
            const result = await User.findById((user as IUser)._id);
            expect(result).to.be.equal(null);
        }));
    })
});