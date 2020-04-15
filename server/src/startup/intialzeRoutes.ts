import { IRouter } from 'express';
import UserRoute from "../routes/user.route";
import CategoryRoute from "../routes/category.route";
import ProductRoute from "../routes/product.route";
import CommentRoute from '../routes/comment.route';

export interface IService {
    path: string;
    router: IRouter
}

export default function (): IService[] {
    const array: IService[] = [];
    array.push(new UserRoute());
    array.push(new CategoryRoute());
    array.push(new ProductRoute());
    array.push(new CommentRoute());
    return array;
}
