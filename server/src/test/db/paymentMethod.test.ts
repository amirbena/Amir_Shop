import { beforeEach, afterEach, it, describe } from "mocha";
import PaymentMethod, { IPaymentMethod } from "../../db/models/paymentMethod.model";
import mochaAsync from '../mochaAsync';
import { expect, should } from 'chai';
import { Types } from "mongoose";
import { OK, INTERNAL_SERVER_ERROR, CONTINUE, BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import database from '../../db/index';

const { PaymentMethodService } = database.Services;

describe("Payment Method Service Check", () => {
    describe("POST/: ", () => {
        beforeEach(mochaAsync(async () => {
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
        }));
        afterEach(mochaAsync(async () => {
            try {
                await PaymentMethod.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        }))
        it("Should return BAD_REQUEST when input invalid", async () => {
            let paymentMethodReturned;
            try {
                const paymentMethod = {
                    paymentMethod: "ab"
                }
                paymentMethodReturned = await PaymentMethodService.addPaymentMethod(paymentMethod)
                expect(paymentMethodReturned.status).to.be.eqls(BAD_REQUEST);
                paymentMethod.paymentMethod = "";
                paymentMethodReturned = await PaymentMethodService.addPaymentMethod(paymentMethod)
                expect(paymentMethodReturned.status).to.be.eqls(BAD_REQUEST);
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
                expect(status).to.be.equal(BAD_REQUEST);
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
                expect(status).to.be.equal(OK);
                expect(details).to.haveOwnProperty("paymentMethod", "Paypal");
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
    describe("GET/:", () => {
        beforeEach(mochaAsync(async () => {
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
        }));
        afterEach(mochaAsync(async () => {
            try {
                await PaymentMethod.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        }))
        it('should return array with 0 elements', async () => {
            try {
                await PaymentMethod.deleteMany({});
                const { status, paymentMethods } = await PaymentMethodService.getAllPaymentMethods();
                expect(status).to.be.equal(OK);
                expect((paymentMethods as IPaymentMethod[])).length(0);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
        it("should return array with 2 elements", async () => {
            try {
                const { status, paymentMethods } = await PaymentMethodService.getAllPaymentMethods();
                expect(status).to.be.equal(OK);
                expect((paymentMethods as IPaymentMethod[])).length(2);
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        })
    })
    describe("DELETE/: ", () => {
        beforeEach(mochaAsync(async () => {
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
        }));
        afterEach(mochaAsync(async () => {
            try {
                await PaymentMethod.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        }))
        it("should return NOT_FOUND  when id is not found into DB", mochaAsync(async () => {
            const id = Types.ObjectId();
            const { status } = await PaymentMethodService.deletePaymentMethod(id);
            expect(status).to.be.equal(NOT_FOUND);
        }))
        it("should return OK , and delete Cash Method from DB", mochaAsync(async () => {
            const paymentMethod = await PaymentMethod.findOne({ paymentMethod: "Cash" });
            const id = (paymentMethod as IPaymentMethod)._id;
            const { status } = await PaymentMethodService.deletePaymentMethod(id);
            expect(status).to.be.equal(OK);
        }))
    })
    describe("GET /:id", () => {
        beforeEach(mochaAsync(async () => {
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
        }));
        afterEach(mochaAsync(async () => {
            try {
                await PaymentMethod.deleteMany({});
            }
            // tslint:disable-next-line: no-empty
            catch (ex) { }
        }))
        it("should return NOT_FOUND status when id is not found into db", mochaAsync(async () => {
            const id = Types.ObjectId();
            const { status } = await PaymentMethodService.findPaymentMethodAccordingId(id);
            expect(status).to.be.equal(NOT_FOUND);
        }));
    })
})