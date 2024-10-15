import { Product } from "./product";

export interface Cart {
    items: Product[];
    id: string;
    createdAt: string;
}