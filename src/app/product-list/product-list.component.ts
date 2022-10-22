import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Product } from '../products.model';
import { BaseProductService } from '../services/base-product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  columnCount = 0;

  constructor(private service: BaseProductService, private responseive: BreakpointObserver) { }

  ngOnInit(): void {
    this.service.getProductList().subscribe(products => this.products = products);

    if (this.responseive.isMatched([Breakpoints.Large, Breakpoints.XLarge])) {
      this.columnCount = 4;
    }

    if (this.responseive.isMatched(Breakpoints.Medium)) {
      this.columnCount = 3;
    }

    if (this.responseive.isMatched(Breakpoints.Small)) {
      this.columnCount = 2;
    }

    if (this.responseive.isMatched(Breakpoints.XSmall)) {
      this.columnCount = 1;
    }

    this.responseive.observe([Breakpoints.Large, Breakpoints.XLarge])
      .subscribe(result => {
        if (result.matches) {
          this.columnCount = 4;
        }
      });

    this.responseive.observe(Breakpoints.Medium)
      .subscribe(result => {
        if (result.matches) {
          this.columnCount = 3;
        }
      });

    this.responseive.observe(Breakpoints.Small)
      .subscribe(result => {
        if (result.matches) {
          this.columnCount = 2;
        }
      });

    this.responseive.observe(Breakpoints.XSmall)
      .subscribe(result => {
        if (result.matches) {
          this.columnCount = 1;
        }
      });
  }
}
