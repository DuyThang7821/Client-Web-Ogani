import axios from "../axios";

export const apigetProducts = () => axios.get("/api/v1/products");

export const apiGetProductById = (productId) => {
    return axios.get(`/api/v1/products/get-by-id/${productId}/product-id`);
};