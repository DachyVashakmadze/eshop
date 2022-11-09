import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Category } from "../category/category.model";
import { BaseCategoryService } from "./base-categoryservice";

// Load categories.json file
import categories from '../data/categories.json';

@Injectable()
export class TestCategoryService extends BaseCategoryService {
    getCategoriesLinear(): Observable<Category[]> {
        throw new Error("Method not implemented.");
    }

    getCategoriesNested(): Observable<Category[]> {
        return of(categories);
    }
}