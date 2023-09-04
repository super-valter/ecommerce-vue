import axios from "axios";

export const http = axios.create({
    baseURL: 'https://dummyjson.com/products'
})

class Products{

    static async productsAll() {
        const response = await http.get("");
        return response.data.products;
    }

    static async productAllCategories(categories: string) {
        const response = await http.get(`/category/${categories}`);        
        return response.data.products;
    }


    static async productAllSearch(serach: string) {
        const response = await http.get(`/search?q=${serach}`);        
        return response.data.products;
    }

    static async productCategories(categories: string) {
        const response = await http.get(`/category/${categories}?limit=3`);        
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