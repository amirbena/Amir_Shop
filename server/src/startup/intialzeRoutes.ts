import { IRouter } from 'express';
import UserRoute from "../routes/user.route";
import CategoryRoute from "../routes/category.route";
import ProductRoute from "../routes/product.route";
import CommentRoute from '../routes/comment.route';
import CartRoute from '../routes/cart.route';
import {IRouteService} from '../routes/generalRoute.route';

export default function (): IRouteService[] {
    const array: IRouteService[] = [];
    array.push(new UserRoute());
    array.push(new CategoryRoute());
    array.push(new ProductRoute());
    array.push(new CommentRoute());
    array.push(new CartRoute());
    return array;
}
