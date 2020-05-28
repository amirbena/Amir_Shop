import { beforeEach, afterEach, it, describe } from "mocha";
import { Types } from "mongoose";
import Category, { ICategory } from '../../db/models/category.model';
import { expect, should } from 'chai';
import mochaAsync from '../mochaAsync';
import { OK, BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import database from '../../db/index';

describe("Category module testing", () => {
    describe("POST/: addCategory", () => {
        beforeEach(mochaAsync(async () => {
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
        }))
        afterEach(mochaAsync(async () => {
            await Category.deleteMany({});
        }));
        it("returns BAD_REQUEST if Category input was wrong", mochaAsync(async () => {
            const { status } = await database.Services.CategoryService.addCategory({ category_name: "AB" });
            expect(status).to.be.equal(BAD_REQUEST);
        }));
        it("returns BAD_REQUEST if Category is exist in db", mochaAsync(async () => {
            const { status } = await database.Services.CategoryService.addCategory({ category_name: "Toys" });
            expect(status).to.be.equal(BAD_REQUEST);
        }));
        it("returns OK and insert Category into db", mochaAsync(async () => {
            const { status } = await database.Services.CategoryService.addCategory({ category_name: "Phones" });
            expect(status).to.be.equal(OK);
            const categories = await Category.find({});
            expect(categories).length(4);
        }));
    })
    describe("GET/: getallcategories()", async () => {
        beforeEach(mochaAsync(async () => {
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
        }))
        afterEach(mochaAsync(async () => {
            await Category.deleteMany({});
        }));
        it("should return 0 elements of categories", mochaAsync(async () => {
            await Category.deleteMany({});
            const categories = await database.Services.CategoryService.getAllCategories();
            expect(categories).length(0);
        }));
        it("should return 3 elements of  db categories", mochaAsync(async () => {
            const categories = await database.Services.CategoryService.getAllCategories();
            expect(categories).length(3);
            expect(categories[0]).property("category_name", "Toys");
            expect(categories[1]).property("category_name", "Sports");
            expect(categories[2]).property("category_name", "Beauty");
        }))
    })
    describe("GET/:id   -getCategoryById()", async () => {
        beforeEach(mochaAsync(async () => {
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
        }))
        afterEach(mochaAsync(async () => {
            await Category.deleteMany({});
        }));
        it("should return NOT_FOUND of not found id into db", mochaAsync(async () => {
            const { status } = await database.Services.CategoryService.getCategoryById(Types.ObjectId().toHexString());
            expect(status).be.equal(NOT_FOUND);
        }))
        it("should return status OK, and category from db", mochaAsync(async () => {
            const categoryToCheck = await Category.findOne({ category_name: "Toys" });
            const id = (categoryToCheck as ICategory)._id;
            const { status, category } = await database.Services.CategoryService.getCategoryById(id);
            const checkedCategory = (category as ICategory);
            expect(status).be.equal(OK);
            expect(checkedCategory).property("category_name", "Toys");
        }));
    })
    describe("DELETE/: -deleteCategory()", async () => {
        beforeEach(mochaAsync(async () => {
            await Category.create({
                category_name: "Toys"
            })
            await Category.create({
                category_name: "Sports"
            })
            await Category.create({
                category_name: "Beauty"
            })
        }))
        afterEach(mochaAsync(async () => {
            await Category.deleteMany({});
        }));
        it("should return NOT_FOUND status of object is not found into DB", mochaAsync(async () => {
            const id = Types.ObjectId();
            const { status } = await database.Services.CategoryService.deleteCategory(id);
            expect(status).be.equals(NOT_FOUND);
        }));
        it("should return status OK,  and delete category from DB", mochaAsync(async () => {
            let object;
            object = await Category.findOne({ category_name: "Toys" });
            const id = (object as ICategory)._id;
            const { status } = await database.Services.CategoryService.deleteCategory(id);
            expect(status).be.equals(OK);
            object = await Category.findOne({ category_name: "Toys" });
            expect(object).to.be.equals(null);
        }));
    })
})

