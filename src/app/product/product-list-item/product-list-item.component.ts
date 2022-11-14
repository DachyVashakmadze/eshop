import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Product } from '../products.model';
import { Router } from '@angular/router';
import { ThemingService } from 'src/app/services/theming.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product!: Product;
  @HostBinding('class') cssThemeClass!: string;

  constructor(private router: Router, private themingService: ThemingService) {
    this.themingService.theme.subscribe(theme => this.cssThemeClass = theme);
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
