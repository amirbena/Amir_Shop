import axios from 'axios';
import { BAD_REQUEST } from "http-status-codes";
import { toast } from 'react-toastify'
const instance = axios.create({
    baseURL: 'http://localhost:5000/api/',
});
instance.interceptors.response.use(null, error => {
    const expectedError = error.response &
        error.response.status >= BAD_REQUEST &&
        error.response.status;
    if (!expectedError) {
        console.log(error);
        toast.error("Something has failed when server handles action");
    }
    return Promise.reject(error);
})
export function setJwt(jwt) {
    instance.defaults.headers.common['x-auth-token'] = jwt;
}
export default instance;