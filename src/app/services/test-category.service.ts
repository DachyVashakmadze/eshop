import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Category } from "../category/category.model";
import { BaseCategoryService } from "./base-categoryservice";

// Load categories.json file
import categories from '../data/categories.json';

@Injectable()
export class TestCategoryService extends BaseCategoryService {
    protected buildCatMap(): {} {
        return this.buildCatMapRecursive(categories, [], {});
    }

    getCategoriesNested(): Observable<Category[]> {
        return of(categories);
    }
}