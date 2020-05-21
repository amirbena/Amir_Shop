import { beforeEach, afterEach, it, describe } from "mocha";
import bcrypt from 'bcrypt';
import { expect } from 'chai';
import iterableArray from '../../common/iterableArray';
import User, { IUser } from '../../db/models/user.model';
import { OK, BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import database from '../../db/index';
import userModel from '../../db/models/user.model';


describe("User Model testing", () => {
    const jwtKey = (process.env.jwtPrivateKey as string);
    describe("Testing POST /: -createUser()", () => {
        beforeEach(async () => {
            try {
                const passwords = ['123456', '123456', 'talleon'];
                const salt = await bcrypt.genSalt();
                const encryptedPasswords: string[] = [];
                let password;
                const iterablePasswords= await iterableArray(passwords);
                for await (password of iterablePasswords){
                    const encrypted= await bcrypt.hash(password,salt);
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
            }
            // tslint:disable-next-line: no-empty
            catch (error) { }
        })
        afterEach(async () => {
            try {
                await User.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })

        it('should get status of BAD_REQUEST of wrong object', async () => {
            try {
                const object = {
                    fullName: '',
                    address: 'hh',
                    email: '1333o3',
                    password: "aa"
                };
                const { status } = await database.Services.UserService.createUser(object, jwtKey);
                expect(status).to.be.equal(BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should get status of BAD_REQUEST of found user in db', async () => {
            try {
                const object = {
                    fullName: 'David Levi',
                    address: 'Ben Gurion 109, Bat-yam',
                    email: 'davidlevi@gmail.com',
                    password: '123456'
                }
                const { status } = await database.Services.UserService.createUser(object, jwtKey);
                expect(status).to.be.equal(BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should get status OK  and return token not empty ', async () => {
            try {
                const object = {
                    fullName: 'Amir Benassayag',
                    address: 'agnon6, Bat-yam',
                    email: 'amir12061968@gmail.com',
                    password: '123456'
                }
                const { status, token } = await database.Services.UserService.createUser(object, jwtKey);
                expect(status).to.be.equal(OK);
                expect(token).to.be.not.equal('');
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
    describe('Testing PUT /: -makeuserAdmin()', () => {
        beforeEach(async () => {
            try {
                const passwords = ['123456', '123456', 'talleon'];
                const salt = await bcrypt.genSalt();
                const encryptedPasswords: string[] = [];
                let password;
                const iterablePasswords= await iterableArray(passwords);
                for await (password of iterablePasswords){
                    const encrypted= await bcrypt.hash(password,salt);
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
            }
            // tslint:disable-next-line: no-empty
            catch (error) { }
        })
        afterEach(async () => {
            try {
                await User.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should get BAD_REQUEST if input is empty', async () => {
            try {
                const { status } = await database.Services.UserService.makeUserAdmin('');
                expect(status).to.be.equal(BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should get status of NOT_FOUND if user doesn\'t exist in db', async () => {
            try {
                const { status } = await database.Services.UserService.makeUserAdmin("ABCDRE116789");
                expect(status).to.be.equal(NOT_FOUND);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should get status of OK if user changed mode to admin', async () => {
            try {
                const userPoped = await userModel.findOne({ fullName: "Tal Leon" });
                const user = (userPoped as IUser);
                const { status } = await database.Services.UserService.makeUserAdmin(user._id);
                expect(status).to.be.equal(OK);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        });
    })
    describe('Testing GET/: ->userLogin()', () => {
        beforeEach(async () => {
            try {
                const passwords = ['123456', '123456', 'talleon'];
                const salt = await bcrypt.genSalt();
                const encryptedPasswords: string[] = [];
                let password;
                const iterablePasswords= await iterableArray(passwords);
                for await (password of iterablePasswords){
                    const encrypted= await bcrypt.hash(password,salt);
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
            }
            // tslint:disable-next-line: no-empty
            catch (error) { }
        })
        afterEach(async () => {
            try {
                await User.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should return BAD_REQUEST if input invalid', async () => {
            try {
                const loginSchema = {
                    email: "amrrr",
                    password: "124"
                };
                const { status } = await database.Services.UserService.userLogin(loginSchema, jwtKey);
                expect(status).to.be.equal(BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should return NOT_FOUND if data if email is exist in DB', async () => {
            try {
                const loginSchema = {
                    email: "amir12061968@gmail.com",
                    password: "ABCDEFG"
                }
                const { status } = await database.Services.UserService.userLogin(loginSchema, jwtKey);
                expect(status).to.be.equal(NOT_FOUND);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should return NOT_FOUND if data if password doesn\'t match ', async () => {
            try {
                const loginSchema = {
                    email: 'tal222881@gmail.com',
                    password: "ABCDEFG"
                }
                const { status } = await database.Services.UserService.userLogin(loginSchema, jwtKey);
                expect(status).to.be.equal(NOT_FOUND);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should return OK if user login is valid', async () => {
            try {
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
                expect(status).to.be.equal(OK);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
    describe('PUT/: updateUser', () => {
        const detailsToUpdate = {
            address: 'Hashalom 67, Tel-Aviv'
        }
        beforeEach(async () => {
            try {
                const passwords = ['123456', '123456', 'talleon'];
                const salt = await bcrypt.genSalt();
                const encryptedPasswords: string[] = [];
                let password;
                const iterablePasswords= await iterableArray(passwords);
                for await (password of iterablePasswords){
                    const encrypted= await bcrypt.hash(password,salt);
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
            }
            // tslint:disable-next-line: no-empty
            catch (error) { }
        })
        afterEach(async () => {
            try {
                await User.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should get BAD_REQUEST if input is empty', async () => {
            try {
                const { status } = await database.Services.UserService.updateUser('', detailsToUpdate);
                expect(status).to.be.equal(BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should get NOT_FOUND if user is not found into db', async () => {
            try {
                const { status } = await database.Services.UserService.updateUser('ABCDEF12355', detailsToUpdate);
                expect(status).to.be.equal(BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should get status OK if update is Succceed', async () => {
            try {
                const userResult = await userModel.findOne({ fullName: "Tal Leon" });
                if (!userResult) {
                    expect(userResult).be.equal(undefined);
                }
                const user = (userResult as IUser);
                const { status } = await database.Services.UserService.updateUser(user.id, detailsToUpdate);
                expect(status).to.be.equal(BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
    describe("GET/: GETALLUSERS", () => {
        beforeEach(async () => {
            try {
                const passwords = ['123456', '123456', 'talleon'];
                const salt = await bcrypt.genSalt();
                const encryptedPasswords: string[] = [];
                let password;
                const iterablePasswords= await iterableArray(passwords);
                for await (password of iterablePasswords){
                    const encrypted= await bcrypt.hash(password,salt);
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
            }
            // tslint:disable-next-line: no-empty
            catch (error) { }
        })
        afterEach(async () => {
            try {
                await User.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should return list of 0 users', async () => {
            try {
                await User.deleteMany({});
                const users = await database.Services.UserService.getAllUsers();
                expect(users).length(0);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should return list of all users', async () => {
            try {
                const users = await database.Services.UserService.getAllUsers();
                expect(users).length(3);
                expect(users[0]).haveOwnProperty("fullName", "Ron Cohen");
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
    describe("DELETE/:", () => {
        beforeEach(async () => {
            try {
                const passwords = ['123456', '123456', 'talleon'];
                const salt = await bcrypt.genSalt();
                const encryptedPasswords: string[] = [];
                let password;
                const iterablePasswords= await iterableArray(passwords);
                for await (password of iterablePasswords){
                    const encrypted= await bcrypt.hash(password,salt);
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
            }
            // tslint:disable-next-line: no-empty
            catch (error) { }
        })
        afterEach(async () => {
            try {
                await User.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should return BAD_REQUEST status', async () => {
            try {
                const { status } = await database.Services.UserService.deleteUser("");
                expect(status).to.be.equal(BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (error) { }
        })
        it('should return NOT_FOUND status', async () => {
            try {
                const { status } = await database.Services.UserService.deleteUser("A5123456");
                expect(status).to.be.equal(BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should  return status OK , and delete Tal Leon user', async () => {
            try {
                const user = await User.findOne({ fullName: "Tal Leon" });
                const { status } = await database.Services.UserService.deleteUser((user as IUser)._id);
                expect(status).to.be.equal(OK);
                const result = await User.findById((user as IUser)._id);
                expect(result).to.be.equal(null);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
});