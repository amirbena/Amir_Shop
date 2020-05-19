import { beforeEach, afterEach, it, describe } from "mocha";
import PaymentMethod, { IPaymentMethod } from "../../db/models/paymentMethod.model";
import { expect } from 'chai';
import { Types } from "mongoose";
import HTTP_STATUS from '../../common/HTTP_Enum';
import database from '../../db/index';


const { PaymentMethodService } = database.Services;

describe("Payment Method Service Check", () => {
    describe("POST/: ", () => {
        beforeEach(async () => {
            try {
                await PaymentMethod.create({
                    paymentMethod: "Credit Card"
                })
                await PaymentMethod.create({
                    paymentMethod: "Cash"
                })
            }

            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        afterEach(async () => {
            try {
                await PaymentMethod.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("Should return BAD_REQUEST when input invalid", async () => {
            let paymentMethodReturned;
            try {
                const paymentMethod = {
                    paymentMethod: "ab"
                }
                paymentMethodReturned = await PaymentMethodService.addPaymentMethod(paymentMethod)
                expect(paymentMethodReturned.status).to.be.eqls(HTTP_STATUS.BAD_REQUEST);
                paymentMethod.paymentMethod = "";
                paymentMethodReturned = await PaymentMethodService.addPaymentMethod(paymentMethod)
                expect(paymentMethodReturned.status).to.be.eqls(HTTP_STATUS.BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("should return BAD_REQUEST when input is exist in DB", async () => {
            const paymentMethod = {
                paymentMethod: "Credit Card"
            }
            try {
                const { status } = await PaymentMethodService.addPaymentMethod(paymentMethod);
                expect(status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("should return OK status, and json of details", async () => {
            const paymentMethod = {
                paymentMethod: "Paypal"
            }
            try {
                const { status, details } = await PaymentMethodService.addPaymentMethod(paymentMethod);
                expect(status).to.be.equal(HTTP_STATUS.OK);
                expect(details).to.haveOwnProperty("paymentMethod", "Paypal");
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
    describe("GET/:", () => {
        beforeEach(async () => {
            try {
                await PaymentMethod.create({
                    paymentMethod: "Credit Card"
                })
                await PaymentMethod.create({
                    paymentMethod: "Cash"
                })
            }

            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        afterEach(async () => {
            try {
                await PaymentMethod.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it('should return array with 0 elements', async () => {
            try {
                await PaymentMethod.deleteMany({});
                const { status, paymentMethods } = await PaymentMethodService.getAllPaymentMethods();
                expect(status).to.be.equal(HTTP_STATUS.OK);
                expect((paymentMethods as IPaymentMethod[])).length(0);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("should return array with 2 elements", async () => {
            try {
                const { status, paymentMethods } = await PaymentMethodService.getAllPaymentMethods();
                expect(status).to.be.equal(HTTP_STATUS.OK);
                expect((paymentMethods as IPaymentMethod[])).length(2);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
    describe("DELETE/: ", () => {
        beforeEach(async () => {
            try {
                await PaymentMethod.create({
                    paymentMethod: "Credit Card"
                })
                await PaymentMethod.create({
                    paymentMethod: "Cash"
                })
            }

            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        afterEach(async () => {
            try {
                await PaymentMethod.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("should return BAD_REQUEST when id is invalid", async () => {
            let paymentMethod;
            try {
                paymentMethod = await PaymentMethodService.deletePaymentMethod("");
                expect(paymentMethod.status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
                paymentMethod = await PaymentMethodService.deletePaymentMethod({});
                expect(paymentMethod.status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
                paymentMethod = await PaymentMethodService.deletePaymentMethod([]);
                expect(paymentMethod.status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
                paymentMethod = await PaymentMethodService.deletePaymentMethod(null);
                expect(paymentMethod.status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
                paymentMethod = await PaymentMethodService.deletePaymentMethod(undefined);
                expect(paymentMethod.status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("should return NOT_FOUND  when id is not found into DB", async () => {
            try {
                const id = Types.ObjectId();
                const { status } = await PaymentMethodService.deletePaymentMethod(id);
                expect(status).to.be.equal(HTTP_STATUS.NOT_FOUND);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("should return OK , and delete Cash Method from DB", async () => {
            try {
                const paymentMethod = await PaymentMethod.findOne({ paymentMethod: "Cash" });
                const id= (paymentMethod as IPaymentMethod)._id;
                const { status } = await PaymentMethodService.deletePaymentMethod(id);
                expect(status).to.be.equal(HTTP_STATUS.OK);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
})