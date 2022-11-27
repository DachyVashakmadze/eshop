import { Observable } from "rxjs";
import { Product } from "../product/products.model";

export abstract class BaseProductService {
    // Return all product list
    abstract getProductList(): Observable<Product[]>;

    // Return product by id
    abstract getProductById(id: number): Observable<Product | null>;

    // Return products by category id
    abstract getProductsByCategory(id: number): Observable<Product[]>;
}