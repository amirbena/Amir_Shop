import { beforeEach, afterEach, it, describe } from "mocha";
import bcrypt from 'bcrypt';
import { expect } from 'chai';
import Category from '../../db/models/category.model'
import iterableArray from '../../common/iterableArray';
import HTTP_STATUS from '../../common/HTTP_Enum';
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
            expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
        })
        it("returns BAD_REQUEST if Category is exist in db", async () => {
            const { status } = await database.Services.CategoryService.addCategory({ category_name: "Sports" });
            expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
        })
        it("returns OK and insert Category into db", async () => {
            const { status } = await database.Services.CategoryService.addCategory({ category_name: "Phones" });
            expect(status).to.be.equal(HTTP_STATUS.OK);
            const categories = await Category.find({});
            expect(categories).length(4);
        })
    })
    describe("GET/: getallcategories",async()=>{
        
    })
})

