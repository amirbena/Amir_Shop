import { ICategory } from './../../db/models/category.model';
import { BAD_REQUEST, OK, NOT_FOUND } from "http-status-codes";
import { beforeEach, afterEach, it, describe } from "mocha";
import { Types } from "mongoose";
import { expect } from 'chai';
import Category from '../../db/models/category.model'
import database from '../../db/index';


describe("Category module testing", () => {
    describe("POST/: addCategory", () => {
        beforeEach(async () => {
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
        })
        afterEach(async () => {
            await Category.deleteMany({});
        })
        it("returns BAD_REQUEST if Category input was wrong", async () => {
            const { status } = await database.Services.CategoryService.addCategory({ category_name: "AB" });
            expect(status).to.be.equal(BAD_REQUEST);
        })
        it("returns BAD_REQUEST if Category is exist in db", async () => {
            const { status } = await database.Services.CategoryService.addCategory({ category_name: "Sports" });
            expect(status).to.be.equal(BAD_REQUEST);
        })
        it("returns OK and insert Category into db", async () => {
            const { status } = await database.Services.CategoryService.addCategory({ category_name: "Phones" });
            expect(status).to.be.equal(OK);
            const categories = await Category.find({});
            expect(categories).length(4);
        })
    })
    describe("GET/: getallcategories()", async () => {
        beforeEach(async () => {
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
        })
        afterEach(async () => {
            await Category.deleteMany({});
        })
        it("should return 0 elements of categories", async () => {
            await Category.deleteMany({});
            const categories = await database.Services.CategoryService.getAllCategories();
            expect(categories).length(0);
        })
        it("should return 3 elements of  db categories", async () => {
            const categories = await database.Services.CategoryService.getAllCategories();
            expect(categories).length(3);
            expect(categories[0]).to.haveOwnProperty("category_name", "Toys");
            expect(categories[1]).to.haveOwnProperty("category_name", "Sports");
            expect(categories[2]).to.haveOwnProperty("category_name", "Beauty");
        })
    })
    describe("GET/:id   -getCategoryById()", async () => {
        beforeEach(async () => {
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
        })
        afterEach(async () => {
            await Category.deleteMany({});
        })
        it("should return BAD_REQUEST of empty id", async () => {
            let object;
            object = await database.Services.CategoryService.getCategoryById("");
            expect(object.status).be.equal(BAD_REQUEST);
            object = await database.Services.CategoryService.getCategoryById(undefined);
            expect(object.status).be.equal(BAD_REQUEST);
            object = await database.Services.CategoryService.getCategoryById(null);
            expect(object.status).be.equal(BAD_REQUEST);
            object = await database.Services.CategoryService.getCategoryById({});
            expect(object.status).be.equal(BAD_REQUEST);
            object = await database.Services.CategoryService.getCategoryById([]);
            expect(object.status).be.equal(BAD_REQUEST);
        })
        it("should return NOT_FOUND of not found id into db", async () => {
            const { status } = await database.Services.CategoryService.getCategoryById(Types.ObjectId);
            expect(status).be.equal(NOT_FOUND);
        })
        it("should return status OK, and category from db", async () => {
            const categoryToCheck = await Category.findOne({ category_name: "Toys" });
            const id = (categoryToCheck as ICategory)._id;
            const { status, category } = await database.Services.CategoryService.getCategoryById(id);
            const checkedCategory = (category as ICategory);
            expect(status).be.equal(OK);
            expect(checkedCategory).haveOwnProperty("category_name", "Toys");
        })
    })
    describe("DELETE/: -deleteCategory()", async () => {
        beforeEach(async () => {
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
        })
        afterEach(async () => {
            await Category.deleteMany({});
        })
        it("should return BAD_REQUEST status of invaid id", async () => {
            let object;
            object = await database.Services.CategoryService.deleteCategory("");
            expect(object.status).be.equal(BAD_REQUEST);
            object = await database.Services.CategoryService.deleteCategory(undefined);
            expect(object.status).be.equal(BAD_REQUEST);
            object = await database.Services.CategoryService.deleteCategory(null);
            expect(object.status).be.equal(BAD_REQUEST);
            object = await database.Services.CategoryService.deleteCategory([]);
            expect(object.status).be.equal(BAD_REQUEST);
            object = await database.Services.CategoryService.deleteCategory({});
            expect(object.status).be.equal(BAD_REQUEST);
        })
        it("should return NOT_FOUND stas of object is not found into DB", async () => {
            const id = Types.ObjectId();
            const { status } = await database.Services.CategoryService.deleteCategory(id);
            expect(status).be.equals(NOT_FOUND);
        })
        it("should return status OK,  and delete category from DB", async () => {
            let object;
            object = await Category.findOne({ category_name: "Toys" });
            const id = (object as ICategory)._id;
            const { status } = await database.Services.CategoryService.deleteCategory(id);
            expect(status).be.equals(OK);
            object = await Category.findOne({ category_name: "Toys" });
            expect(object).to.be.equals(null);
        })
    })
})

