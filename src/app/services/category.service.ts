import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { Category } from "../category/category.model";

import { HttpClient } from "@angular/common/http";

import categories_ka from '../data/categories_ka.json';
import { Breadcrumb } from "../breadcrumb/breadcrumb.model";

@Injectable()
export class CategoryService {
    categories = new BehaviorSubject<Category[]>([]);
    catMap = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient) {
        this.getCategoriesFromSource().subscribe(cats => {
            this.categories.next(cats);
            this.catMap.next(this.buildCatMapRecursive(this.categories.value));
        });
    }
    
    getBreadcrumbItemsForCategory(categoryId: number): Observable<Breadcrumb[]> {
        return this.catMap.pipe(map(mapItems => mapItems[categoryId] ? mapItems[categoryId].breadcrumb : []));
    }

    private getCategoriesFromSource(): Observable<Category[]> {
        return this.http.get<Category[]>("http://localhost:7200/api/categories");
    }

    private buildCatMapRecursive(cats: Category[] = [], breadcrumbItems: Breadcrumb[] = [], result: any = {}): {} {
        for (let cat of cats) {
            let breadcrumbItem: Breadcrumb = {
                'title': cat.name,
                'url': 'category/' + cat.id
            }
            result = {
                ...result, [cat.id]: {
                    'name': cat.name,
                    'breadcrumb': [...breadcrumbItems, breadcrumbItem]
                }
            };
            if (cat.children) {
                result = this.buildCatMapRecursive(cat.children, [...breadcrumbItems, breadcrumbItem], result);
            }
        }

        return result;
    }

}