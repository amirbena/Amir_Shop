import httpService from './httpService';


const getProducts = async () => {
    try {
        const res = await httpService.get("products/detailedProducts")
        const { detailedProudcts } = res.data;
        return detailedProudcts;
    } catch (ex) {
        throw ex.data
    }
}


export { getProducts };