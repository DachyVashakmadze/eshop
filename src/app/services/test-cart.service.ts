import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject, from, Observable, of, scheduled } from 'rxjs';
import { CartItem } from '../cart/cart-item.model';
import { Product } from '../product/products.model';
import { BaseCartService } from './base-cart.service';

export class TestCartService extends BaseCartService {
  // Todo simply return dummy data, need to create cookie and read from it
  private testItems = new BehaviorSubject<CartItem[]>([]);

  getCartItems(): Observable<CartItem[]> {
    return this.testItems;
  }

  addItem(product: Product): Observable<number> {
    this.testItems.next([...this.testItems.value, {
      product_id: product.id,
      product_name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image
    }]);

    return scheduled([this.testItems.value.length], asyncScheduler);
  }

  removeItem(productId: number): Observable<number> {
    this.testItems.next(this.testItems.value.filter(i => i.product_id !== productId));

    return scheduled([this.testItems.value.length], asyncScheduler);
  }

  updateQuantity(productId: number, quantity: number): Observable<number> {
    throw new Error('Method not implemented.');
  }

}
