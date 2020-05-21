
import { ICategory } from '../models/category.model';
import { IUser } from '../models/user.model';
import iterableArray from '../../common/iterableArray';
import Comment, { IComment } from '../models/comment.model';
import Product, { IProduct, validateProduct, IProductInput } from "../models/product.model";
import { OK, INTERNAL_SERVER_ERROR, CONTINUE, BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import GeneralService from './generalService';

export interface IDetailedProduct {
    _id: any;
    category: ICategory;
    admin: IUser;
    name: string;
    price_for_each: number;
    amount: number;
    image_url: string;
}

export default class ProductService extends GeneralService {

    public static async addProduct(product: IProductInput)
        : Promise<{ status: number, details: string, product?: IProduct }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const { error } = validateProduct(product);
            if (error) {
                status = BAD_REQUEST;
                throw new Error(error.details[0].message);
            }
            const { status: statusCategory, details: detailsCategory } = await this.findCategoryById(product.category_id);
            if (statusCategory !== CONTINUE) {
                status = statusCategory;
                throw new Error(detailsCategory);
            }
            const { status: statusAdmin, details: detailsAdmin } = await this.findUserById(product.admin_id);
            if (statusAdmin !== CONTINUE) {
                status = statusAdmin;
                throw new Error(detailsAdmin);
            }
            const productAdded = await Product.create(product);
            status = OK;
            details = productAdded.toJSON();
            return {
                status,
                details,
                product: productAdded
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async getDetailedProductById(productId: string)
        : Promise<{ status: number, details: string, detailedProduct?: IDetailedProduct }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!productId) {
                status = BAD_REQUEST;
                throw new Error("invalid product id - undefinded / null");
            }
            const product = await Product.findById(productId);
            if (!product) {
                status = NOT_FOUND;
                throw new Error("product is not found into db")
            }
            const { status: statusCategory, details: detailsCategory, category } = await this.findCategoryById(product.category_id);
            if (statusCategory !== CONTINUE) {
                status = statusCategory;
                throw new Error(detailsCategory);
            }
            const { status: statusAdmin, details: detailsAdmin, user: admin } = await this.findUserById(product.admin_id);
            if (statusAdmin !== CONTINUE) {
                status = statusAdmin;
                throw new Error(detailsAdmin);
            }
            const { _id, name, price_for_each, amount, image_url } = product;
            const detailedProduct = {
                _id: _id as string,
                category: category as ICategory,
                admin: admin as IUser,
                name: name as string,
                price_for_each: price_for_each as number,
                amount: amount as number,
                image_url: image_url as string
            }
            status = OK;
            details = "Succeed found";
            return {
                status,
                details,
                detailedProduct
            }

        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async getDetailedProducts(): Promise<{ status: number, details: string, detailedProducts: IDetailedProduct[] }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        const detailedProducts: IDetailedProduct[] = [];
        try {
            const products = await Product.find();
            if (!products.length) {
                status = NOT_FOUND;
                throw new Error("not found products into db")
            }
            // tslint:disable-next-line: prefer-const
            for await (let product of await iterableArray<IProduct>(products)) {
                const { status: productStatus, details: detailedProductStatus, detailedProduct } = await this.getDetailedProductById((product as IProduct)._id);
                if (productStatus !== OK) {
                    status = productStatus;
                    throw new Error(detailedProductStatus);
                }
                detailedProducts.push((detailedProduct as IDetailedProduct));
            }
            status = OK;
            details = "succeeed to find";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details,
            detailedProducts
        }
    }
    public static async updateProductDetails(productId: string, detailsToUpdate: object)
        : Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!productId) {
                status = BAD_REQUEST;
                throw new Error("Product is null or undefined");
            }
            const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, detailsToUpdate);
            if (!updatedProduct) {
                status = NOT_FOUND;
                throw new Error("product is not found");
            }
            status = OK;
            details = "Product updated";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async  getAvgRankForEachProduct(id: string)
        : Promise<{ status: number, details?: string, avgRank?: number }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const { status: statusProduct, details: detailsProduct, product } = await this.findProductById(id);
            if (statusProduct !== CONTINUE) {
                status = statusProduct;
                throw new Error(detailsProduct);
            }
            const comments = await Comment.find({ product_id: (product as IProduct)._id });
            if (!comments.length) {
                throw new Error("no comments for this product");
            }
            let avgRank = 0;
            // tslint:disable-next-line: prefer-const
            for await (let comment of await iterableArray<IComment>(comments)) {
                avgRank += (comment as IComment).rank;
            }
            avgRank = avgRank / comments.length;
            status = OK;
            return {
                status,
                avgRank
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            details,
            status
        }
    }
    public static async getProducts(): Promise<IProduct[]> {
        return await Product.find();
    }
    public static async deleteProduct(productId: string)
        : Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!productId) {
                status = BAD_REQUEST;
                throw new Error("productId is invalid");
            }
            const product = await Product.findByIdAndDelete(productId);
            if (!product) {
                status = NOT_FOUND;
                throw new Error("product is not found");
            }
            status = OK;
            details = "delete is succeed";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
}