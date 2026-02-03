import { IProduct } from "./product.interface";

export interface ISale {
    saleId: number;
    customerName: string;
    saleDate: Date | string;
    totalAmount: number;
    items: ISaleItem[];
}

export interface ISaleItem {
    saleItemId: number;
    product: IProduct;
    quantity: number;
    unitPrice: number;
}

export interface ISalePayload {
    customerName: string;
    items: ISaleItemPayload[];
}

export interface ISaleItemPayload {
    productId: number;
    quantity: number;
}