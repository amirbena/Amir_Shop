import { beforeEach, afterEach, it, describe } from "mocha";
import { BAD_REQUEST, OK, NOT_FOUND } from "http-status-codes";
import Category from '../../db/models/category.model';
import User from '../../db/models/user.model';
import Product, { IProduct } from "../../db/models/product.model";
import { Types } from "mongoose";
import { expect } from 'chai';
import database from '../../db/index';



describe("Product Module testing", () => {
    describe("POST/:  - addProduct()", () => {
        beforeEach(async () => {
            await User.create({
                fullName: "Amir Benassayag",
                address: "Agnon 6 Bat-yam",
                email: "amir12061968@gmail.com",
                password: "12345678",
                isAdmin: true
            })
            await User.create({
                fullName: "Tal Leon",
                address: "Maimon 15 Bat-yam",
                email: "talleon@gmail.com",
                password: "12345678",
                isAdmin: true
            })
            const users = await User.find({});
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
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
        });
        afterEach(async () => {
            await Product.deleteMany({});
            await User.deleteMany({});
            await Category.deleteMany({});
        })
        it("should get BAD_REQUEST when product is invalid", async () => {
            const product = {
                admin_id: Types.ObjectId(),
                category_id: Types.ObjectId(),
                name: "rr",
                price_for_each: 0.25,
                amount: 0.5,
                image_url: ""
            }
            const { status } = await database.Services.ProductService.addProduct(product);
            expect(status).to.be.equal(BAD_REQUEST);
        })
        it("should get BAD_REQUEST when category is invalid", async () => {
            const product = {
                admin_id: Types.ObjectId(),
                category_id: null,
                name: "AMIROS",
                price_for_each: 0.55,
                amount: 20,
                image_url: "GGKGGKGKGKG"
            }
            const { status } = await database.Services.ProductService.addProduct(product);
            expect(status).to.be.equal(BAD_REQUEST);
        })
        it("should get NOT_FOUND  when category not found", async () => {
            const product = {
                admin_id: Types.ObjectId(),
                category_id: Types.ObjectId(),
                name: "AMIROS",
                price_for_each: 0.55,
                amount: 20,
                image_url: "GGKGGKGKGKG"
            }
            const { status } = await database.Services.ProductService.addProduct(product);
            expect(status).to.be.equal(NOT_FOUND);
        })
        it("should get BAD_REQUEST when admin is invalid", async () => {
            const product = {
                admin_id: undefined,
                category_id: Types.ObjectId(),
                name: "AMIROS",
                price_for_each: 0.55,
                amount: 20,
                image_url: "GGKGGKGKGKG"
            }
            const { status } = await database.Services.ProductService.addProduct(product);
            expect(status).to.be.equal(BAD_REQUEST);
        })
        it("should get NOT_FOUND  when category not found", async () => {
            const product = {
                admin_id: Types.ObjectId(),
                category_id: Types.ObjectId(),
                name: "AMIROS",
                price_for_each: 0.55,
                amount: 20,
                image_url: "GGKGGKGKGKG"
            }
            const { status } = await database.Services.ProductService.addProduct(product);
            expect(status).to.be.equal(NOT_FOUND);
        })
        it("should get OK status, and get new product", async () => {
            const users = await User.find({})
            const categories = await Category.find({});
            const product = {
                admin_id: users[1]._id,
                category_id: categories[1]._id,
                name: "sockes",
                price_for_each: 0.55,
                amount: 20,
                image_url: "GGKGGKGKGKG"
            }
            const { status, product: productAdded } = await database.Services.ProductService.addProduct(product);
            expect(status).to.be.equal(OK);
            const productAdd = (productAdded as IProduct);
            expect(productAdd).to.include({
                admin_id: users[1]._id,
                category_id: categories[1]._id,
                name: "sockes",
                price_for_each: 0.55,
                amount: 20,
                image_url: "GGKGGKGKGKG"
            });
        })
    })
})