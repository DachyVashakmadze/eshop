import { Component, Input, OnInit } from '@angular/core';
import { ThemeableComponent } from 'src/app/common/theamable.component';
import { Product } from 'src/app/product/products.model';
import { BaseCartService } from 'src/app/services/base-cart.service';
import { BaseProductService } from 'src/app/services/base-product.service';
import { ThemingService } from 'src/app/services/theming.service';
import { CartItem } from '../cart-item.model';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.scss']
})
export class CartListItemComponent extends ThemeableComponent {
  @Input() cartItem!: CartItem;

  constructor(
    private cartService: BaseCartService,
    protected override themingService: ThemingService
  ) {
    super(themingService);
  }

  increaseQty() {
    this.cartItem.quantity += 1;
    this.cartService.updateQuantity(this.cartItem.productId, this.cartItem.quantity);
  }

  decreaseQty() {
    this.cartItem.quantity -= 1;
    this.cartService.updateQuantity(this.cartItem.productId, this.cartItem.quantity);
  }

  removeItem() {
    this.cartService.removeItem(this.cartItem.productId);
  }
}
