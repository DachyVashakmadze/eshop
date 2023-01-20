import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Category } from "../category/category.model";
import { BaseCategoryService } from "./base-categoryservice";

import { HttpClient } from "@angular/common/http";

import categories_ka from '../data/categories_ka.json';
@Injectable()
export class CategoryService extends BaseCategoryService {
    constructor(private http: HttpClient) { 
        super();
    }

    protected buildCatMap(): {} {
        return this.buildCatMapRecursive(categories_ka, [], {});
    }

    getCategoriesNested(): Observable<Category[]> {
        return this.http.get<Category[]>("http://localhost:7200/api/categories");
    }
}