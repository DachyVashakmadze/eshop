import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject, from, Observable, of, scheduled } from 'rxjs';
import { CartItem } from '../cart/cart-item.model';
import { Product } from '../product/products.model';
import { BaseCartService } from './base-cart.service';
import { CookieService } from './cookie.service';

export class TestCartService extends BaseCartService {
  // Todo simply return dummy data, need to create cookie and read from it
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private cookieName = 'cart';

  constructor(private cookieService: CookieService) {
    super();
    this.getItemsFromCookie();
  }

  // Returns the list of cart items
  getCartItems(): Observable<CartItem[]> {
    return this.cartItems;
  }

  // Add cart item, set cookie
  addItem(product: Product): Observable<number> {
    this.cartItems.next([...this.cartItems.value, {
      product_id: product.id,
      product_name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image
    }]);
    this.setCookie();

    return scheduled([this.cartItems.value.length], asyncScheduler);
  }

  // Remove cart items, set cookie
  removeItem(productId: number): Observable<number> {
    this.cartItems.next(this.cartItems.value.filter(i => i.product_id !== productId));

    this.setCookie();

    return scheduled([this.cartItems.value.length], asyncScheduler);
  }

  updateQuantity(productId: number, quantity: number): Observable<number> {
    throw new Error('Method not implemented.');
  }

  // Use cookie service to set cookie
  setCookie() {
    this.cookieService.set(this.cookieName, this.cartItems.value);
  }

  // Read cookie and set cart items
  getItemsFromCookie() {
    let cookieItems = this.cookieService.get(this.cookieName);
    console.log(cookieItems);
    if (cookieItems) {
      this.cartItems.next(JSON.parse(cookieItems));
    }
  }

}
