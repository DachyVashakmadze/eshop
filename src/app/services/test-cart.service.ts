import { Injectable } from '@angular/core';
import { asyncScheduler, from, Observable, of, scheduled } from 'rxjs';
import { CartItem } from '../cart/cart-item.model';
import { Product } from '../product/products.model';
import { BaseCartService } from './base-cart.service';

export class TestCartService extends BaseCartService {
  // Todo simply return dummy data, need to create cookie and read from it
  private testItems: CartItem[] = [];

  getCartItems(): Observable<CartItem[]> {
    return scheduled([this.testItems], asyncScheduler);
  }

  addItem(product: Product): Observable<number> {
    this.testItems.push({
      product_id: product.id,
      product_name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image
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
