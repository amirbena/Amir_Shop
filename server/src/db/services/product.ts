
import { ICategory } from '../models/category.model';
import { IUser } from '../models/user.model';
import iterableArray from '../../common/iterableArray';
import Comment from '../models/comment.model';
import Product, { IProduct, validateProduct } from "../models/product.model";
import HTTP_STATUS from '../../common/HTTP_Enum';
import GeneralService from './generalService';

export interface IDetailedProduct {
    _id: string;
    category: ICategory;
    admin: IUser;
    price_for_each: number;
    amount: number;
    image_url: string;
}
const { NOT_FOUND, OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, CONTINUE } = HTTP_STATUS;
export default class ProductService extends GeneralService {

    public static async addProduct(product: IProduct)
        : Promise<{ status: HTTP_STATUS, details: string }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
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
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async getDetailedProductById(productId: string)
        : Promise<{ status: HTTP_STATUS, details: string, detailedProduct?: IDetailedProduct }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
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
            const detailedProduct = {
                _id: product._id as string,
                category: category as ICategory,
                admin: admin as IUser,
                price_for_each: product.price_for_each as number,
                amount: product.amount as number,
                image_url: product.image_url as string
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
    public static async getDetailedProducts(): Promise<{ status: HTTP_STATUS, details: string, detailedProducts: IDetailedProduct[] }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        const detailedProducts: IDetailedProduct[] = [];
        try {
            const products = await Product.find();
            if (!products.length) {
                status = NOT_FOUND;
                throw new Error("not found products into db")
            }
            // tslint:disable-next-line: prefer-const
            for await (let product of iterableArray(products)) {
                const { status: productStatus, details: detailedProductStatus, detailedProduct } = await this.getDetailedProductById(product);
                if (productStatus !== OK) {
                    status = productStatus;
                    throw new Error(detailedProductStatus);
                }
                detailedProducts.push(product);
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
        : Promise<{ status: HTTP_STATUS, details: string }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
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
    public static async getAvgRankForEachProduct(id: string)
        : Promise<{ status: HTTP_STATUS, details?: string, avgRank?: number }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
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
            for await (let comment of iterableArray(comments)) {
                avgRank += comment.rank;
            }
            avgRank = avgRank / comments.length;
            status= OK;
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
        : Promise<{ status: HTTP_STATUS, details: string }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
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