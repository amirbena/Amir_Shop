import { beforeEach, afterEach, it, describe } from "mocha";
import { Types } from "mongoose";
import { expect } from 'chai';
import bcrypt from 'bcrypt';
import { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND } from "http-status-codes";
import mochaAsync from '../mochaAsync';
import iterableArray from '../../common/iterableArray';
import User, { IUser } from '../../db/models/user.model';
import Product, { IProduct } from "../../db/models/product.model";
import Category from '../../db/models/category.model';
import Comment, { IComment } from '../../db/models/comment.model';
import CommentService, { IDetailedComment } from '../../db/services/comment';
import commentModel from "../../db/models/comment.model";
import { IDetailedProduct } from "../../db/services/product";

describe("Comment Module Testing", () => {
    describe("GET/:", () => {
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
                isAdmin: true,
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
                isAdmin: true,
                fullName: 'Tal Leon',
                address: 'Harav Maimon 15, Bat-yam',
                email: 'tal222881@gmail.com',
                password: encryptedPasswords[2]
            })
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
            const users = await User.find({});
            const categories = await Category.find({});
            await Product.create({
                category_id: categories[0]._id,
                admin_id: users[0]._id,
                name: "Barbie",
                price_for_each: 5,
                amount: 1000,
                image_url: "axtttklgmg.png"
            })
            await Product.create({
                category_id: categories[0]._id,
                admin_id: users[1]._id,
                name: "Can",
                price_for_each: 4.5,
                amount: 1000,
                image_url: "axtttklgmg.png"
            })
            await Product.create({
                category_id: categories[2]._id,
                admin_id: users[1]._id,
                name: "Make-up",
                price_for_each: 3,
                amount: 15000,
                image_url: "axtttklgmg.png"
            })
            const products = await Product.find({});
            await Comment.create({
                user_id: users[0]._id,
                product_id: products[0]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
            await Comment.create({
                user_id: users[2]._id,
                product_id: products[1]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
            await Comment.create({
                user_id: users[1]._id,
                product_id: products[0]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
        }))
        afterEach(mochaAsync(async () => {
            await Comment.deleteMany({});
            await Product.deleteMany({});
            await Category.deleteMany({});
            await User.deleteMany({})
        }))
        it("should return comment with 0 elements, and status OK", mochaAsync(async () => {
            await Comment.deleteMany({});
            const { status, comments } = await CommentService.getComments();
            expect(status).to.be.equal(OK);
            expect((comments as IComment[])).to.have.length(0);
        }));
        it("should return comment with greater than 0 elements, and status OK", mochaAsync(async () => {
            const { status, comments } = await CommentService.getComments();
            expect(status).to.be.equal(OK);
            expect((comments as IComment[])).to.have.length.greaterThan(0);
        }))
    })
    describe("POST/: ", () => {
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
                isAdmin: true,
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
                isAdmin: true,
                fullName: 'Tal Leon',
                address: 'Harav Maimon 15, Bat-yam',
                email: 'tal222881@gmail.com',
                password: encryptedPasswords[2]
            })
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
            const users = await User.find({});
            const categories = await Category.find({});
            await Product.create({
                category_id: categories[0]._id,
                admin_id: users[0]._id,
                name: "Barbie",
                price_for_each: 5,
                amount: 1000,
                image_url: "axtttklgmg.png"
            })
            await Product.create({
                category_id: categories[0]._id,
                admin_id: users[1]._id,
                name: "Can",
                price_for_each: 4.5,
                amount: 1000,
                image_url: "axtttklgmg.png"
            })
            await Product.create({
                category_id: categories[2]._id,
                admin_id: users[1]._id,
                name: "Make-up",
                price_for_each: 3,
                amount: 15000,
                image_url: "axtttklgmg.png"
            })
            const products = await Product.find({});
            await Comment.create({
                user_id: users[0]._id,
                product_id: products[0]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
            await Comment.create({
                user_id: users[2]._id,
                product_id: products[1]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
            await Comment.create({
                user_id: users[1]._id,
                product_id: products[0]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
        }))
        afterEach(mochaAsync(async () => {
            await Comment.deleteMany({});
            await Product.deleteMany({});
            await Category.deleteMany({});
            await User.deleteMany({})
        }))
        it("should return BAD_REQUEST when input is invalid", mochaAsync(async () => {
            const comment = {
                user_id: "undefined",
                product_id: "undefined",
                title: "DG",
                comment: "rGGGG",
                rank: -3
            };
            const { status } = await CommentService.addComment(comment);
            expect(status).to.be.equal(BAD_REQUEST);
        }))
        it("should return BAD_REQUEST when comment is found into db", mochaAsync(async () => {
            const users = await User.find({});
            const products = await Product.find({});
            const comment = {
                user_id: users[0]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                product_id: products[0]._id,
                rank: 4
            }
            const { status } = await CommentService.addComment(comment);
            expect(status).to.be.equal(BAD_REQUEST);
        }))
        it("return NOT_FOUND  if product_id is is not found into DB", mochaAsync(async () => {
            const users = await User.find({});
            const comment = {
                user_id: users[0]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                product_id: Types.ObjectId().toHexString(),
                rank: 4
            };
            const { status } = await CommentService.addComment(comment);
            expect(status).to.be.eql(NOT_FOUND);
        }))
        it("should return NOT_FOUND  if user_id is not found into DB", mochaAsync(async () => {
            const products = await Product.find({});
            const comment = {
                user_id: Types.ObjectId().toHexString(),
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                product_id: products[0]._id,
                rank: 4
            }
            const { status } = await CommentService.addComment(comment);
            expect(status).to.be.eql(NOT_FOUND);
        }))
        it("should create new comment, and return status OK", mochaAsync(async () => {
            const users = await User.find({});
            const products = await Product.find({});
            const comment = {
                user_id: users[2]._id,
                title: "That's good",
                comment: "I like this product, it is very good",
                product_id: products[2]._id,
                rank: 4
            }
            const { status } = await CommentService.addComment(comment);
            expect(status).to.be.equal(OK);
        }))
    })
    describe("GET/: detailedcomment", () => {
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
                isAdmin: true,
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
                isAdmin: true,
                fullName: 'Tal Leon',
                address: 'Harav Maimon 15, Bat-yam',
                email: 'tal222881@gmail.com',
                password: encryptedPasswords[2]
            })
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
            const users = await User.find({});
            const categories = await Category.find({});
            await Product.create({
                category_id: categories[0]._id,
                admin_id: users[0]._id,
                name: "Barbie",
                price_for_each: 5,
                amount: 1000,
                image_url: "axtttklgmg.png"
            })
            await Product.create({
                category_id: categories[0]._id,
                admin_id: users[1]._id,
                name: "Can",
                price_for_each: 4.5,
                amount: 1000,
                image_url: "axtttklgmg.png"
            })
            await Product.create({
                category_id: categories[2]._id,
                admin_id: users[1]._id,
                name: "Make-up",
                price_for_each: 3,
                amount: 15000,
                image_url: "axtttklgmg.png"
            })
            const products = await Product.find({});
            await Comment.create({
                user_id: users[0]._id,
                product_id: products[0]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
            await Comment.create({
                user_id: users[2]._id,
                product_id: products[1]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
            await Comment.create({
                user_id: users[1]._id,
                product_id: products[0]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
        }))
        afterEach(mochaAsync(async () => {
            await Comment.deleteMany({});
            await Product.deleteMany({});
            await Category.deleteMany({});
            await User.deleteMany({})
        }))
        it("should return BAD_REQUEST when id is empty", mochaAsync(async () => {
            const { status } = await CommentService.getDetailedComment("");
            expect(status).to.be.equal(BAD_REQUEST);
        }))
        it("should return NOT_FOUND if id is not found", mochaAsync(async () => {
            const id = Types.ObjectId().toHexString();
            const { status } = await CommentService.getDetailedComment(id);
            expect(status).to.be.equal(NOT_FOUND);
        }))
        it("should return detailed comment, and OK", mochaAsync(async () => {
            const comments = await Comment.find({});
            const id = comments[0]._id;
            const { status, detailedComment } = await CommentService.getDetailedComment(id);
            expect(status).to.be.equal(OK);
            expect(detailedComment).not.to.be.undefined;
            expect(detailedComment).to.have.property("title", "It's Shit!");
            expect((detailedComment as IDetailedComment).user).to.have.property("fullName", "Ron Cohen");
        }))
    })
    describe("PUT/: ", () => {
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
                isAdmin: true,
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
                isAdmin: true,
                fullName: 'Tal Leon',
                address: 'Harav Maimon 15, Bat-yam',
                email: 'tal222881@gmail.com',
                password: encryptedPasswords[2]
            })
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
            const users = await User.find({});
            const categories = await Category.find({});
            await Product.create({
                category_id: categories[0]._id,
                admin_id: users[0]._id,
                name: "Barbie",
                price_for_each: 5,
                amount: 1000,
                image_url: "axtttklgmg.png"
            })
            await Product.create({
                category_id: categories[0]._id,
                admin_id: users[1]._id,
                name: "Can",
                price_for_each: 4.5,
                amount: 1000,
                image_url: "axtttklgmg.png"
            })
            await Product.create({
                category_id: categories[2]._id,
                admin_id: users[1]._id,
                name: "Make-up",
                price_for_each: 3,
                amount: 15000,
                image_url: "axtttklgmg.png"
            })
            const products = await Product.find({});
            await Comment.create({
                user_id: users[0]._id,
                product_id: products[0]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
            await Comment.create({
                user_id: users[2]._id,
                product_id: products[1]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
            await Comment.create({
                user_id: users[1]._id,
                product_id: products[0]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
        }))
        afterEach(mochaAsync(async () => {
            await Comment.deleteMany({});
            await Product.deleteMany({});
            await Category.deleteMany({});
            await User.deleteMany({})
        }))
        it("should return BAD_REQUEST when id is empty", mochaAsync(async () => {
            const { status } = await CommentService.updateComment("", {});
            expect(status).to.be.equal(BAD_REQUEST);
        }))
        it("should return NOT_FOUND if id is not found", mochaAsync(async () => {
            const id = Types.ObjectId().toHexString();
            const { status } = await CommentService.updateComment(id, {});
            expect(status).to.be.equal(NOT_FOUND);
        }))
        it("should return INTERNAL_SERVER_ERROR when details to update is not invalid", mochaAsync(async () => {
            const comments = await Comment.find({});
            const id = comments[0]._id;
            const { status, details } = await CommentService.updateComment(id, { password: "xyz" });
            expect(status).to.be.eqls(BAD_REQUEST);
            expect(details).to.be.equal("Invalid input of object updating");
        }))
        it("should update object when details to update is empty", mochaAsync(async () => {
            const comments = await Comment.find({});
            const id = comments[0]._id;
            const { status, details } = await CommentService.updateComment(id, {});
            expect(status).to.be.eqls(OK);
            expect(details).to.be.equal("Object updated");
        }))
        it("should update object, return status OK, and object should be updated", async () => {
            const comments = await Comment.find({});
            const id = comments[0]._id;
            const title = "bullshit";
            const { status, details } = await CommentService.updateComment(id, { title });
            expect(status).to.be.eqls(OK);
            expect(details).to.be.equal("Object updated");
            const comment = await Comment.findById(id);
            expect(comment).to.have.property("title", "bullshit");
        })
    })
    describe("DELETE/: ", () => {
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
                isAdmin: true,
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
                isAdmin: true,
                fullName: 'Tal Leon',
                address: 'Harav Maimon 15, Bat-yam',
                email: 'tal222881@gmail.com',
                password: encryptedPasswords[2]
            })
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
            const users = await User.find({});
            const categories = await Category.find({});
            await Product.create({
                category_id: categories[0]._id,
                admin_id: users[0]._id,
                name: "Barbie",
                price_for_each: 5,
                amount: 1000,
                image_url: "axtttklgmg.png"
            })
            await Product.create({
                category_id: categories[0]._id,
                admin_id: users[1]._id,
                name: "Can",
                price_for_each: 4.5,
                amount: 1000,
                image_url: "axtttklgmg.png"
            })
            await Product.create({
                category_id: categories[2]._id,
                admin_id: users[1]._id,
                name: "Make-up",
                price_for_each: 3,
                amount: 15000,
                image_url: "axtttklgmg.png"
            })
            const products = await Product.find({});
            await Comment.create({
                user_id: users[0]._id,
                product_id: products[0]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
            await Comment.create({
                user_id: users[2]._id,
                product_id: products[1]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
            await Comment.create({
                user_id: users[1]._id,
                product_id: products[0]._id,
                title: "It's Shit!",
                comment: "I don't Like this product, it is shitty and nothing",
                rank: 1
            })
        }))
        afterEach(mochaAsync(async () => {
            await Comment.deleteMany({});
            await Product.deleteMany({});
            await Category.deleteMany({});
            await User.deleteMany({})
        }))
        it("should return BAD_REQUEST when id is invalid", mochaAsync(async () => {
            const { status } = await CommentService.deleteComment("");
            expect(status).to.be.equal(BAD_REQUEST);
        }))
        it("should return NOT_FOUND  when id to delete is not found in DB", mochaAsync(async () => {
            const id = Types.ObjectId().toHexString();
            const { status } = await CommentService.deleteComment(id);
            expect(status).to.be.equals(NOT_FOUND);
        }))
        it("should delete intance from DB", mochaAsync(async () => {
            const comments = await Comment.find({});
            const id = comments[0]._id;
            const { status } = await CommentService.deleteComment(id);
            expect(status).be.equals(OK);
        }))
    })

})