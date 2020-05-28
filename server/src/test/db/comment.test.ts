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
import CommentService from '../../db/services/comment';

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
    })

})