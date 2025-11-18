import { ICategory } from "./category.interface";

export interface IProduct {
    productId: number;
    name: string;
    price: number;
    description: string;
    amount: number;
    category: ICategory;
}

export interface IProductPayload {
    name: string;
    price: number;
    description: string;
    amount: number;
    categoryId: number;
}