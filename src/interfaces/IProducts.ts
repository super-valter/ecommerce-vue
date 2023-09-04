export interface IProducts {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: Array<string>
}

export interface IProductsCart {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    stock: number;
    thumbnail: string;
    brand: string;
    qtd: number
}

export interface breadcrumbs {
    title: string,
    disabled: boolean,
    href: string
  }