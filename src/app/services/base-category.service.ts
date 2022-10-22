import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Category } from '../categories/category';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseCategoryService {

  abstract getCategories(): Observable<Category[]> | null;

  abstract getCategoryById(id: number): Observable<Category> | null;
}
