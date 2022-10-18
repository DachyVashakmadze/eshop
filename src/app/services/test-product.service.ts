import { Injectable } from '@angular/core';
import { Product } from '../products.model'
import { BaseProductService } from './base-product.service';

// Load products.json file
import productList from '../data/products.json';
import { Observable, of } from 'rxjs';

@Injectable()
export class TestProductService extends BaseProductService {

  getProductList(): Observable<Product[]> {
    return of(productList);
  }

  getProductById(id: number): Observable<Product | null> {
    const products = productList.filter(product => product.id == id) as Product[];
    const product = (products && products.length) ? products[0] : null 
    return of(product);
  }

}
