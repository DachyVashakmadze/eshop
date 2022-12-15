import { Injectable } from '@angular/core';
import { Product } from '../product/products.model'
import { BaseProductService } from './base-product.service';
import { asyncScheduler, Observable, scheduled } from 'rxjs';

// Load products.json file
import productList from '../data/products.json';

@Injectable()
export class TestProductService extends BaseProductService {

  getProductList(): Observable<Product[]> {
    return scheduled([productList], asyncScheduler);
  }

  getProductById(id: number): Observable<Product | null> {
    const products = productList.filter(product => product.id == id) as Product[];
    const product = (products && products.length) ? products[0] : null
    return scheduled([product], asyncScheduler);
  }

  getProductsByIds(ids: number[]): Observable<Product[]> {
    const products = productList.filter(product => ids.includes(product.id)) as Product[];
    return scheduled([products], asyncScheduler);
  }

  getProductsByCategory(id: number): Observable<Product[]> {
    const products = productList.filter(product => product.categoryId == id) as Product[];
    return scheduled([products], asyncScheduler);
  }

}
