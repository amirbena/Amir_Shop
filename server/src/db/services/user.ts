import bcrypt from 'bcrypt';
import joi, { validate, valid } from "joi";
import jwt from 'jsonwebtoken';
import User, { IUser, IUserInput, validateUser, ILogin } from "../models/user.model";
import { OK, INTERNAL_SERVER_ERROR, CONTINUE, BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import GeneralService from "./generalService";

class UserService extends GeneralService {

    public static async createUser(user: IUserInput, jwtKey: string): Promise<{ status: number, details: string, token: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let token = '';
        let details = "";
        try {
            const { error } = validateUser(user);
            if (error) {
                status = BAD_REQUEST;
                throw new Error(error.details[0].message);
            }
            const foundUser = await User.findOne({ email: user.email });
            if (foundUser) {
                status = BAD_REQUEST;
                throw new Error("User isn't found into DB");
            }
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
            const createdUser = await User.create(user);
            if (createdUser) {
                status = OK;
                details = createdUser.toJSON();
                token = this.generateAuthToken(createdUser, jwtKey);
            }

        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details,
            token
        }
    }
    public static async makeUserAdmin(_id: any): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const { status: foundUserStatus, details: foundUserDetails, user: foundUser } = await this.findUserById(_id);
            if (foundUserStatus !== CONTINUE && !foundUser) {
                status = foundUserStatus;
                throw new Error(foundUserDetails);
            }
            let user = (foundUser as IUser);
            user.isAdmin = true;
            user = await user.save();
            status = OK;
            details = user.toJSON();
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async userLogin(detailsforQuerying: ILogin, jwtLogin: string): Promise<{ status: number, details: string, token?: string }> {
        const { email, password } = detailsforQuerying;
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        let token: string = "";
        try {
            const { error } = this.validateLogin(detailsforQuerying);
            if (error) {
                status = BAD_REQUEST;
                throw new Error(error.details[0].message);
            }
            let user = await User.findOne({ email });
            if (!user) {
                status = NOT_FOUND;
                throw new Error(`current email not found, please change it`)
            }
            user = (user as IUser);
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                status = NOT_FOUND;
                throw new Error("please type another password");
            }
            status = OK;
            details = user.toJSON();
            token = this.generateAuthToken(user, jwtLogin);

        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details,
            token
        }
    }
    public static async getUserById(id: string): Promise<{ status: number, details: string, user?: IUser }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const { status: userStatus, details: userDetails, user } = await this.findUserById(id);
            if (userStatus !== CONTINUE) {
                status = userStatus;
                throw new Error(userDetails);
            }
            status = OK;
            details = "found";
            return {
                status,
                details,
                user: user as IUser
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async updateUser(_id: any, detailstoUpdate: object) {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!_id) {
                status = BAD_REQUEST;
                throw new Error("each of details is invalid- _id is mongoose object id, details to update is object");
            }
            let user = await User.findByIdAndUpdate(_id, detailstoUpdate);
            if (!user) {
                status = NOT_FOUND;
                throw new Error("user with given ID is not found into db");;
            }
            user = (user as IUser);
            status = OK;
            details = user.toJSON();

        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async getAllUsers(): Promise<IUser[]> {
        return await User.find();
    }
    public static async deleteUser(_id: any): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (_id === "") {
                status = BAD_REQUEST;
                throw new Error("ID isn't given");
            }
            const result = await User.findByIdAndDelete(_id);
            if (!result) {
                status = NOT_FOUND;
                throw new Error("Given ID isn't found in DB");
            }
            status = OK;
            details = "Succeed deleted";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    private static generateAuthToken(user: IUser, jwtPrivateKey: string): string {
        const token = jwt.sign({
            _id: user._id,
            isAdmin: user.isAdmin
        }, jwtPrivateKey);
        return token;
    }
    private static validateLogin(details: ILogin) {
        const schema = {
            email: joi.string().email().required().min(5).max(255),
            password: joi.string().min(5).max(255)
        }
        return validate(details, schema);
    }
}

export default UserService;