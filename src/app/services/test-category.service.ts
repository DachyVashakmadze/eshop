import { Inject, Injectable, LOCALE_ID } from "@angular/core";
import { Observable, of } from "rxjs";
import { Category } from "../category/category.model";
import { BaseCategoryService } from "./base-categoryservice";

// Load categories.json file
import categories_en from '../data/categories_en.json';
import categories_ka from '../data/categories_ka.json';

@Injectable()
export class TestCategoryService extends BaseCategoryService {
    private categories!: Category[];
    constructor(@Inject(LOCALE_ID) private locale: string) {
        super();
        this.loadCategories();
    }

    private loadCategories() {
        if(this.locale === 'en') {
            this.categories = categories_en;
            return;
        }

        this.categories = categories_ka;
    }

    protected buildCatMap(): {} {
        return this.buildCatMapRecursive(this.categories, [], {});
    }

    getCategoriesNested(): Observable<Category[]> {
        return of(this.categories);
    }
}