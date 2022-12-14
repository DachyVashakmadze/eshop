import { Injectable } from '@angular/core';
import { asyncScheduler, from, Observable, of, scheduled } from 'rxjs';
import { CartItem } from '../cart/cart-item.model';
import { Product } from '../product/products.model';
import { BaseCartService } from './base-cart.service';

export class TestCartService extends BaseCartService {
  // Todo simply return dummy data, need to create cookie and read from it
  private testItems = [
    {
      product_id: 5,
      product_name: 'TEST PRODUCT 1',
      price: 50,
      quantity: 2,
    },
    {
      product_id: 4,
      product_name: 'TEST PRODUCT 2',
      price: 20,
      quantity: 3,
    },
  ];

  getCartItems(): Observable<CartItem[]> {
    return scheduled([this.testItems], asyncScheduler);
  }

  addItem(product: Product): Observable<number> {
    this.testItems.push({
      product_id: product.id,
      product_name: product.title,
      price: product.price,
      quantity: 1,
    });

    return scheduled([this.testItems.length], asyncScheduler);
  }

  removeItem(productId: number): Observable<number> {
    throw new Error('Method not implemented.');
  }
  
  updateQuantity(productId: number, quantity: number): Observable<number> {
    throw new Error('Method not implemented.');
  }

}
