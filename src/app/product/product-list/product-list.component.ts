import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../products.model';
import { BaseProductService } from '../../services/base-product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: null | Product[] = [];
  columnCount = 0;
  productSubscription!: Subscription;
  breakpointSubscriptions: Subscription[] = [];

  constructor(
    private service: BaseProductService,
    private responseive: BreakpointObserver,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      let categoryId = param['id'];
      if (categoryId) {
        this.productSubscription = this.service.getProductsByCategory(categoryId).subscribe(products => this.products = products);
      } else {
        this.productSubscription = this.service.getProductList().subscribe(products => this.products = products);
      }
    });

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

    this.breakpointSubscriptions.push(
      this.responseive.observe([Breakpoints.Large, Breakpoints.XLarge])
        .subscribe(result => {
          if (result.matches) {
            this.columnCount = 4;
          }
        })
    );

    this.breakpointSubscriptions.push(
      this.responseive.observe(Breakpoints.Medium)
        .subscribe(result => {
          if (result.matches) {
            this.columnCount = 3;
          }
        })
    );

    this.breakpointSubscriptions.push(
      this.responseive.observe(Breakpoints.Small)
        .subscribe(result => {
          if (result.matches) {
            this.columnCount = 2;
          }
        })
    );

    this.breakpointSubscriptions.push(
      this.responseive.observe(Breakpoints.XSmall)
        .subscribe(result => {
          if (result.matches) {
            this.columnCount = 1;
          }
        })
    );
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
    this.breakpointSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}