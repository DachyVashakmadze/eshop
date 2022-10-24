import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../products.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {
  @Input() product!: Product;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addToCart(id: number) {
    console.log(`Add to cart, product id: ${id}`);
  }

  addToWatchlist(id: number) {
    console.log(`Add to watchlist, product id: ${id}`);
  }

  openProduct(id: number) {
    console.log(`Open product personal page, product id: ${id}`);
    this.router.navigate(['product', id]);
  }
}
