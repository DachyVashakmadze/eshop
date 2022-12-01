import { Observable } from "rxjs";
import { Breadcrumb } from "../breadcrumb/breadcrumb.model";
import { Category } from "../category/category.model";

export abstract class BaseCategoryService {
    protected _catMap: any = {};

    // Return all category map with title and breadcrumb info
    getCatMap(): any {
        if (!Object.keys(this._catMap).length) {
            this._catMap = this.buildCatMap();
        }
        return this._catMap;
    };

    // Return nested categories as hierarchy
    abstract getCategoriesNested(): Observable<Category[]>;

    protected abstract buildCatMap(): any;

    protected buildCatMapRecursive(cats: Category[] = [], breadcrumbItems: Breadcrumb[] = [], result: {} = {}): {} {
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

    getBreadcrumbItemsForCategory(categoryId: number) {
        const catItem = this.getCatFromMap(categoryId);
        return catItem ? catItem.breadcrumb : [];
    }

    private getCatFromMap(categoryId: number) {
        const catMap = this.getCatMap();
        return catMap[categoryId];
    }
}