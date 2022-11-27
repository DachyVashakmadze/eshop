import { Observable } from "rxjs";
import { Category } from "../category/category.model";

export abstract class BaseCategoryService {
    // Return all categories as array
    abstract getCategoriesLinear(): Observable<Category[]>;

    // Return nested categories as hierarchy
    abstract getCategoriesNested(): Observable<Category[]>;
}