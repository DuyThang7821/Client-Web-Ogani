import axios from "../axios";

export const apiLogin = (data) => axios.post("/api/v1/auth/sign-in", data);

export const apiRegister = (data) => axios.post("/api/v1/auth/sign-up", data);

export const apiLogout = () => axios.get("/api/v1/auth/sign-out");

export const apiGetCartById = (accountId) => axios.get(`/api/v1/carts/get-by-account-id/${accountId}/account-id`);

export const apiAddCart = (data) => axios.post('/api/v1/carts', data);

export const apiUpdateCart = (data) => axios.put('/api/v1/carts/update-cart', data);

export const apiCreateOder = (cartId) => axios.post(`/api/v1/orders/order-products/${cartId}/cart-id`)

export const apiGetAccount = () => axios.get('/api/v1/accounts');

export const apiGetAccountById = (accountId) => axios.get(`/api/v1/accounts/get-by-id/${accountId}/account-id`);

export const apiUpdateAccount = (accountId, data) => axios.put(`/api/v1/accounts/update-account/${accountId}/account-id`, data);

export const apiUpdatePassword = (accountId, data) => axios.put(`/api/v1/accounts/change-password/${accountId}/account-id`, data); 

export const apiGetOrderByAccount = (accountId) => axios.get(`/api/v1/orders/get-by-account-id/${accountId}/account-id`);