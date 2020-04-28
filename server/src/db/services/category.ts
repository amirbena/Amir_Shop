import Category, { ICategory, validateCategory } from "../models/category.model";
import HTTP_STATUS from "../../common/HTTP_Enum";
import GeneralService from "./generalService";

const { OK, BAD_REQUEST, CONTINUE, INTERNAL_SERVER_ERROR, NOT_FOUND } = HTTP_STATUS;
class CategoryService extends GeneralService {
    public static async addCategory(category: any): Promise<{ status: HTTP_STATUS, details: string }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details = "";
        try {
            const { error } = validateCategory(category);
            if (error) {
                status = BAD_REQUEST;
                throw new Error(error.details[0].message);
            }
            let insertedCategory = await Category.findOne({ category_name: category.category_name });
            if (insertedCategory) {
                status = BAD_REQUEST;
                throw new Error("category is found in db");
            }
            insertedCategory = await Category.create(category);
            if (!insertedCategory) throw new Error("Something happend when insert db into status");
            status = OK;
            details = insertedCategory.toJSON();
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async getAllCategories(): Promise<ICategory[]> {
        return await Category.find();
    }
    public static async getCategoryById(_id: string): Promise<{ status: HTTP_STATUS, details: string, category?: ICategory }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const { status: statusCheck, details: detailsCheck,category } = await this.findCategoryById(_id);
            if (statusCheck !== CONTINUE) {
                status= statusCheck;
                throw new Error(detailsCheck);
            }
            status=OK;
            const categoryAfter= (category as ICategory);
            details= categoryAfter.toString();
            return{
                status,
                details,
                category
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async deleteCategory(_id: string): Promise<{ status: HTTP_STATUS, details: string }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!_id) {
                status = BAD_REQUEST;
                throw new Error("_id is null/ undefined ");
            }
            const deletedItem = await Category.deleteOne({ _id });
            if (!deletedItem) {
                status = NOT_FOUND;
                throw new Error("item is not found on DB");
            }
            status = OK;
            details = "Succeed delete";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }

}
export default CategoryService;