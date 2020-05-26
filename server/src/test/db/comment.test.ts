import { beforeEach, afterEach, it, describe } from "mocha";
import { Types } from "mongoose";
import { expect } from 'chai';
import bcrypt from 'bcrypt';
import iterableArray from '../../common/iterableArray';
import User, { IUser } from '../../db/models/user.model';
import Product, { IProduct } from "../../db/models/product.model";
import Category from '../../db/models/category.model';
import Comment from '../../db/models/comment.model';
import CommentService from '../../db/services/comment';

describe("Comment Module Testing", () => {
    describe("GET/:", () => {
        beforeEach(async () => {
            try {
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
                    comment: "Zona",
                    rank: 1
                })
                await Comment.create({
                    user_id: users[2]._id,
                    product_id: products[1]._id,
                    title: "It's Shit!",
                    comment: "Zona",
                    rank: 1
                })
                await Comment.create({
                    user_id: users[3]._id,
                    product_id: products[0]._id,
                    title: "It's Shit!",
                    comment: "Zona",
                    rank: 1
                })
            }
            // tslint:disable-next-line: no-empty
            catch (error) { }
        })
        afterEach(async () => {
            try {
                await Comment.deleteMany({});
                await Product.deleteMany({});
                await Category.deleteMany({});
                await User.deleteMany({})
            }
            // tslint:disable-next-line: no-empty
            catch (error) { }
        })
    })
})