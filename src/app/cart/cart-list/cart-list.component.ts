import { Component, OnInit } from '@angular/core';
import { ThemeableComponent } from 'src/app/common/theamable.component';
import { BaseCartService } from 'src/app/services/base-cart.service';
import { BreadcumbService } from 'src/app/services/breadcumb.service';
import { ThemingService } from 'src/app/services/theming.service';
import { CartItem } from '../cart-item.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent extends ThemeableComponent implements OnInit {
  cartItems: CartItem[] = [];
  loading = true;

  constructor(
    private cartService: BaseCartService,
    private breadcrumbService: BreadcumbService,
    protected override themingService: ThemingService
  ) {
    super(themingService);
  }

  ngOnInit(): void {
    // Empty breadcrumb
    this.breadcrumbService.setItems([]);

    this.loadItems();
  }

  // Get items from service
  loadItems() {
    this.loading = true;

    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.loading = false;
    });
  }
}
