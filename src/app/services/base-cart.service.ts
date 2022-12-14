import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../cart/cart-item.model';
import { Product } from '../product/products.model';

export abstract class BaseCartService {

  // Return all card items
  abstract getCartItems(): Observable<CartItem[]>;

  // Add an item to the cart, return the number of items in the cart
  abstract addItem(product: Product): Observable<number>;

  // Remove an item to the cart, return the nuber of items in the cart
  abstract removeItem(productId: number): Observable<number>;

  // Update the quantity of the cart item
  abstract updateQuantity(productId: number, quantity: number): Observable<number>;

}
