import { Component, OnInit } from '@angular/core';
import { ThemeableComponent } from 'src/app/common/theamable.component';
import { BaseCartService } from 'src/app/services/base-cart.service';
import { ThemingService } from 'src/app/services/theming.service';
import { CartItem } from '../cart-item.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent extends ThemeableComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: BaseCartService,
    protected override themingService: ThemingService
  ) {
    super(themingService);
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => this.cartItems = items);
  }


}
