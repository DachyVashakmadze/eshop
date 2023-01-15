import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Category } from "../category/category.model";
import { BaseCategoryService } from "./base-categoryservice";

// Load categories.json file
import categories from '../data/categories.json';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CategoryService extends BaseCategoryService {
    constructor(private http: HttpClient) { 
        super();
    }

    protected buildCatMap(): {} {
        return this.buildCatMapRecursive(categories, [], {});
    }

    getCategoriesNested(): Observable<Category[]> {
        return this.http.get<Category[]>("http://localhost:7200/api/categories/tree");
    }
}