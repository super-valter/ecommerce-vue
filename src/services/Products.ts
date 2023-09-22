import axios from "axios";

export const http = axios.create({
    baseURL: 'https://dummyjson.com/products'
})

class Products{

    static async productsAll(skip: number = 0) {
        try{
        const response = await http.get(`?limit=20&skip=${skip}`);
        return response.data;
        } catch (error) {
            console.log('===', error);
            
        }
    }

    static async productAllCategories(categories: string, skip: number = 0) {
        try {
            const response = await http.get(`/category/${categories}?limit=20&skip=${skip}`);
            return response.data;            
        } catch (error) {
            console.log();            
        }
    }


    static async productAllSearch(serach: string, skip: number = 0) {
        try {
            const response = await http.get(`/search?q=${serach}&limit=20&skip=${skip}`);
            return response.data;            
        } catch (error) {
            console.log();            
        }
    }

    static async productsCategories(categories: string) {
        try {
            const response = await http.get(`/category/${categories}?limit=4`);
            return response.data.products;            
        } catch (error) {
            console.log();
        }
    }

    static async productsitem(id: number) {
        try {
            const response = await http.get(`/${id}`);        
            return response.data;            
        } catch (error) {
            console.log();
                        
        }
    }

    static async categories() {
        try {
            const response = await http.get(`/categories`);        
            return response.data;            
        } catch (error) {
            console.log();            
        }
    }

}

export default Products