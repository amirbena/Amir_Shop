import http, { setJwt } from '../common/httpService';
import jwtDecode from 'jwt-decode';

const tokenKey = 'token';
const endpoint = 'users';
setJwt(getJwt());

export async function login(email, password) {
    try {
        const { data } = await http.get(`${endpoint}/login`, {
            data: {
                email,
                password
            }
        })
        const { token: jwt } = data;
        localStorage.setItem(tokenKey, jwt);
    } catch (ex) {
        
    }

}
export function logout(){
    localStorage.removeItem(tokenKey);
}
export function getCurrentUser(){
    try {
        const jwt= localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}
export function loginWithJwt(jwt){
    localStorage.setItem(tokenKey,jwt);
}
export function getJwt() {
    return localStorage.getItem(tokenKey)
}

export default{
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
}