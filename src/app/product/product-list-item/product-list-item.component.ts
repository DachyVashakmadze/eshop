import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Product } from '../products.model';
import { Router } from '@angular/router';
import { ThemingService } from 'src/app/services/theming.service';
import { ThemeableComponent } from 'src/app/common/theamable.component';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent extends ThemeableComponent implements OnInit {
  @Input() product!: Product;

  constructor(private router: Router, protected override themingService: ThemingService) {
    super(themingService);
  }

  ngOnInit(): void {
  }

  addToCart() {
    console.log(`Add to cart, product id: ${this.product.id}`);
  }

  addToWatchlist() {
    console.log(`Add to watchlist, product id: ${this.product.id}`);
  }

  openProduct() {
    console.log(`Open product personal page, product id: ${this.product.id}`);
    this.router.navigate(['product', this.product.id]);
  }
}
