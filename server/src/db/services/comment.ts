import { Types } from 'mongoose';

import Comment, { IComment, validateComment } from "../models/comment.model";
import { IUser } from "../models/user.model";
import { IProduct } from "../models/product.model";
import HTTP_STATUS from '../../common/HTTP_Enum';
import GeneralService from './generalService';


const { NOT_FOUND, OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, CONTINUE } = HTTP_STATUS;
export interface IDetailedComment {
    id: string;
    user: IUser;
    product: IProduct;
    title: string;
    comment: string;
    rank: number

}
export default class CommentService extends GeneralService {
    public static async addComment(comment: IComment):
        Promise<{ status: HTTP_STATUS, details: string }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        const { error } = validateComment(comment);
        if (error) {
            status = BAD_REQUEST;
            details = error.details[0].message;
            return {
                status,
                details
            }
        }
        try {
            let commentAdded = await Comment.findOne({
                title: comment.title,
                comment: comment.comment
            })
            if (commentAdded) {
                status = BAD_REQUEST;
                throw new Error("the comment is exist in db");
            }
            const { status: statusProduct, details: detailsProduct, } = await this.findProductById(comment.product_id);
            if (statusProduct !== CONTINUE) {
                status = statusProduct;
                throw new Error(detailsProduct);
            }
            const { status: statusUser, details: detailsUser } = await this.findUserById(comment.user_id);
            if (statusUser !== CONTINUE) {
                status = statusUser;
                throw new Error(detailsUser);
            }
            commentAdded = await Comment.create(comment);
            status = OK;
            details = commentAdded.toJSON();
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async getDetailedComment(id: string):
        Promise<{ status: HTTP_STATUS, details?: string, detailedComment?: IDetailedComment }> {
        let status: HTTP_STATUS = NOT_FOUND;
        let details: string = "";
        try {
            if (!id) {
                status = BAD_REQUEST;
                throw new Error("id is invalid");
            }
            const comment = await Comment.findById(id);
            if (!comment) {
                status = NOT_FOUND;
                throw new Error("comment is not found into db");
            }
            const { status: statusProduct, details: detailsProduct, product } = await this.findProductById(comment.product_id);
            if (statusProduct !== CONTINUE) {
                status = statusProduct;
                throw new Error(detailsProduct);
            }
            const { status: statusUser, details: detailsUser, user } = await this.findUserById(comment.user_id);
            if (statusProduct !== CONTINUE) {
                status = statusUser;
                throw new Error(detailsUser);
            }
            const detailedComment = {
                id: comment.id as string,
                user: user as IUser,
                product: product as IProduct,
                title: comment.title as string,
                comment: comment.comment as string,
                rank: comment.rank as number
            }
            status = OK;
            return {
                status,
                detailedComment
            }

        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async updateComment(id: string, detailsToUpdate: object): Promise<{ status: HTTP_STATUS, details: string }> {
        let status: HTTP_STATUS = NOT_FOUND;
        let details: string = "";
        try {
            if (!id) {
                status = BAD_REQUEST;
                throw new Error("id is invalid");
            }
            const comment = await Comment.findByIdAndUpdate(id, detailsToUpdate);
            if (!comment) {
                status = NOT_FOUND;
                throw new Error("comment is not found");
            }
            status = OK;
            details = "Object updated";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async deleteComment(id: string): Promise<{ status: HTTP_STATUS, details: string }> {
        let status: HTTP_STATUS = NOT_FOUND;
        let details: string = "";
        try {
            if (!id) {
                status = BAD_REQUEST;
                throw new Error("id is invalid");
            }
            const comment = await Comment.findByIdAndDelete(id);
            if (!comment) {
                status = NOT_FOUND;
                throw new Error("comment is not found");
            }
            status = OK;
            details = "Comment deleted";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async getComments(): Promise<IComment[]> {
        return await Comment.find();
    }
}