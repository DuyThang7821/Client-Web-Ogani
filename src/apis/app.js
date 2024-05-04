import axios from '../axios';

export const apiGetCategories = () => axios.get('/api/v1/categories');
