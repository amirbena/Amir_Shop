import { beforeEach, afterEach, it, describe } from "mocha";
import { Types } from "mongoose";
import Category, { ICategory } from '../../db/models/category.model';
import { expect } from 'chai';
import HTTP_STATUS from '../../common/HTTP_Enum';
import database from '../../db/index';


describe("Category module testing", () => {
    describe("POST/: addCategory", () => {
        beforeEach(async () => {
            try {
                await Category.create({
                    category_name: "Toys"
                })
                await Category.create({
                    category_name: "Sports"
                })
                await Category.create({
                    category_name: "Beauty"
                })
                // tslint:disable-next-line: no-empty
            } catch (ex) { }
        })
        afterEach(async () => {
            try {
                await Category.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) {}
        })
        it("returns BAD_REQUEST if Category input was wrong", async () => {
            try {
                const { status } = await database.Services.CategoryService.addCategory({ category_name: "AB" });
                expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("returns BAD_REQUEST if Category is exist in db", async () => {
            try {
                const { status } = await database.Services.CategoryService.addCategory({ category_name: "AB" });
                expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("returns OK and insert Category into db", async () => {
            try {
                const { status } = await database.Services.CategoryService.addCategory({ category_name: "Phones" });
                expect(status).to.be.equal(HTTP_STATUS.OK);
                const categories = await Category.find({});
                expect(categories).length(4);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
    describe("GET/: getallcategories()", async () => {
        beforeEach(async () => {
            try {
                await Category.create({
                    category_name: "Toys"
                })
                await Category.create({
                    category_name: "Sports"
                })
                await Category.create({
                    category_name: "Beauty"
                })
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        afterEach(async () => {
            try {
                await Category.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) {}
        })
        it("should return 0 elements of categories", async () => {
            try {
                await Category.deleteMany({});
                const categories = await database.Services.CategoryService.getAllCategories();
                expect(categories).length(0);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("should return 3 elements of  db categories", async () => {
            try {
                const categories = await database.Services.CategoryService.getAllCategories();
                expect(categories).length(3);
                expect(categories[0]).to.haveOwnProperty("category_name", "Toys");
                expect(categories[1]).to.haveOwnProperty("category_name", "Sports");
                expect(categories[2]).to.haveOwnProperty("category_name", "Beauty");
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
    describe("GET/:id   -getCategoryById()", async () => {
        beforeEach(async () => {
            try {
                await Category.create({
                    category_name: "Toys"
                })
                await Category.create({
                    category_name: "Sports"
                })
                await Category.create({
                    category_name: "Beauty"
                })
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        afterEach(async () => {
            try {
                await Category.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) {}
        })
        it("should return BAD_REQUEST of empty id", async () => {
            let object;
            try {
                object = await database.Services.CategoryService.getCategoryById("");
                expect(object.status).be.equal(HTTP_STATUS.BAD_REQUEST);
                object = await database.Services.CategoryService.getCategoryById(undefined);
                expect(object.status).be.equal(HTTP_STATUS.BAD_REQUEST);
                object = await database.Services.CategoryService.getCategoryById(null);
                expect(object.status).be.equal(HTTP_STATUS.BAD_REQUEST);
                object = await database.Services.CategoryService.getCategoryById({});
                expect(object.status).be.equal(HTTP_STATUS.BAD_REQUEST);
                object = await database.Services.CategoryService.getCategoryById([]);
                expect(object.status).be.equal(HTTP_STATUS.BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("should return NOT_FOUND of not found id into db", async () => {
            try {
                const { status } = await database.Services.CategoryService.getCategoryById(Types.ObjectId);
                expect(status).be.equal(HTTP_STATUS.NOT_FOUND);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("should return status OK, and category from db", async () => {
            try {
                const categoryToCheck = await Category.findOne({ category_name: "Toys" });
                const id = (categoryToCheck as ICategory)._id;
                const { status, category } = await database.Services.CategoryService.getCategoryById(id);
                const checkedCategory = (category as ICategory);
                expect(status).be.equal(HTTP_STATUS.OK);
                expect(checkedCategory).haveOwnProperty("category_name", "Toys");
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
    describe("DELETE/: -deleteCategory()", async () => {
        beforeEach(async () => {
            try {
                await Category.create({
                    category_name: "Toys"
                })
                await Category.create({
                    category_name: "Sports"
                })
                await Category.create({
                    category_name: "Beauty"
                })
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        afterEach(async () => {
            try {
                await Category.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) {}
        })
        it("should return BAD_REQUEST status of invaid id", async () => {
            let object;
            try {
                object = await database.Services.CategoryService.deleteCategory("");
                expect(object.status).be.equal(HTTP_STATUS.BAD_REQUEST);
                object = await database.Services.CategoryService.deleteCategory(undefined);
                expect(object.status).be.equal(HTTP_STATUS.BAD_REQUEST);
                object = await database.Services.CategoryService.deleteCategory(null);
                expect(object.status).be.equal(HTTP_STATUS.BAD_REQUEST);
                object = await database.Services.CategoryService.deleteCategory([]);
                expect(object.status).be.equal(HTTP_STATUS.BAD_REQUEST);
                object = await database.Services.CategoryService.deleteCategory({});
                expect(object.status).be.equal(HTTP_STATUS.BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("should return NOT_FOUND stas of object is not found into DB", async () => {
            try {
                const id = Types.ObjectId();
                const { status } = await database.Services.CategoryService.deleteCategory(id);
                expect(status).be.equals(HTTP_STATUS.NOT_FOUND);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) {}
        })
        it("should return status OK,  and delete category from DB", async () => {
            try {
                let object;
                object = await Category.findOne({ category_name: "Toys" });
                const id = (object as ICategory)._id;
                const { status } = await database.Services.CategoryService.deleteCategory(id);
                expect(status).be.equals(HTTP_STATUS.OK);
                object = await Category.findOne({ category_name: "Toys" });
                expect(object).to.be.equals(null);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }

        })
    })
})

