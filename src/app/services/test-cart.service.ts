import { asyncScheduler, BehaviorSubject, Observable, scheduled } from 'rxjs';
import { CartCookieItem } from '../cart/cart-cookie-item';
import { CartItem } from '../cart/cart-item.model';
import { Product } from '../product/products.model';
import { BaseCartService } from './base-cart.service';
import { BaseProductService } from './base-product.service';
import { CookieService } from './cookie.service';

export class TestCartService extends BaseCartService {
  // Todo simply return dummy data, need to create cookie and read from it
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private cookieName = 'cart';

  constructor(
    private cookieService: CookieService,
    private productService: BaseProductService
  ) {
    super();
    this.getItemsFromCookie();
  }

  // Returns the list of cart items
  getCartItems(): Observable<CartItem[]> {
    return this.cartItems;
  }

  // Add cart item, set cookie
  addItem(product: Product): Observable<number> {

    // If product is already in cart, just increase quantity
    const productCartItem = this.cartItems.value.find(i => i.productId == product.id);
    if (productCartItem) {
      return this.updateQuantity(productCartItem.productId, productCartItem.quantity + 1)
    }

    this.cartItems.next([...this.cartItems.value, {
      productId: product.id,
      productName: product.title,
      price: product.price,
      quantity: 1,
      image: product.image
    }]);
    this.setCookie();

    return scheduled([this.cartItems.value.length], asyncScheduler);
  }

  // Remove cart items, set cookie
  removeItem(productId: number): Observable<number> {
    this.cartItems.next(this.cartItems.value.filter(i => i.productId !== productId));

    this.setCookie();

    return scheduled([this.cartItems.value.length], asyncScheduler);
  }


  // Update quantity of cart item
  updateQuantity(productId: number, quantity: number): Observable<number> {
    const cartItemIndex = this.cartItems.value.findIndex(item => item.productId === productId);
    let cartItems = this.cartItems.value;

    if (cartItemIndex !== -1) {
      cartItems[cartItemIndex].quantity = quantity;
    }

    this.cartItems.next(cartItems);

    this.setCookie();

    return scheduled([this.cartItems.value.length], asyncScheduler);
  }

  // Use cookie service to set cookie
  setCookie() {
    this.cookieService.set(this.cookieName, this.cartItems.value.map(item => {
      return {
        productId: item.productId,
        quantity: item.quantity
      } as CartCookieItem
    }));
  }

  // Read cookie and set cart items
  getItemsFromCookie() {
    const cookieItems = this.cookieService.get(this.cookieName);
    if (cookieItems) {
      const cartCookieItems: CartCookieItem[] = JSON.parse(cookieItems);
      let quantities: any = [];

      let uniqueIds: number[] = [];
      cartCookieItems.forEach(item => {
        if (!uniqueIds.includes(item.productId)) {
          uniqueIds.push(item.productId);
          quantities[item.productId] = item.quantity;
        }
      });

      this.productService.getProductsByIds(uniqueIds).subscribe(products => {
        const cartItems = products.map(p => {
          return {
            productId: p.id,
            productName: p.title,
            price: p.price,
            quantity: quantities[p.id],
            image: p.image
          } as CartItem
        });

        this.cartItems.next(cartItems);
      })
    }
  }

}
