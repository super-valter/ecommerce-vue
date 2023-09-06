import axios from "axios";

export const http = axios.create({
    baseURL: 'https://dummyjson.com/products'
})

class Products{

    static async productsAll(skip: number = 0) {
        const response = await http.get(`?limit=20&skip=${skip}`);
        return response.data;
    }

    static async productAllCategories(categories: string, skip: number = 0) {
        const response = await http.get(`/category/${categories}?limit=20&skip=${skip}`);
        return response.data;
    }


    static async productAllSearch(serach: string, skip: number = 0) {
        const response = await http.get(`/search?q=${serach}&limit=20&skip=${skip}`);
        return response.data;
    }

    static async productsCategories(categories: string) {
        const response = await http.get(`/category/${categories}?limit=4`);
        return response.data.products;
    }

    static async productsitem(id: number) {
        const response = await http.get(`/${id}`);        
        return response.data;
    }

    static async categories() {
        const response = await http.get(`/categories`);        
        return response.data;
    }

}

export default Products