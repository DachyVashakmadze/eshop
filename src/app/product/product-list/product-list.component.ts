import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../products.model';
import { BaseProductService } from '../../services/base-product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BreadcumbService } from 'src/app/services/breadcumb.service';
import { BaseCategoryService } from 'src/app/services/base-categoryservice';
import { Breadcrumb } from 'src/app/breadcrumb/breadcrumb.model';
import { ThemeableComponent } from 'src/app/common/theamable.component';
import { ThemingService } from 'src/app/services/theming.service';

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
    private categoryService: BaseCategoryService,
    private responseive: BreakpointObserver,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcumbService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      let categoryId = param['id'];
      let breadcrumbItems: Breadcrumb[] = [];
      if (categoryId) {
        this.productSubscription = this.service.getProductsByCategory(categoryId).subscribe(products => this.products = products);
        breadcrumbItems = this.categoryService.getBreadcrumbItemsForCategory(categoryId);
      } else {
        this.productSubscription = this.service.getProductList().subscribe(products => this.products = products);
        breadcrumbItems = [ {
          'title': $localize `:@@all_products_static_text:ყველა პროდუქტი`,
          'url': '/'
        }];
      }
      this.breadcrumbService.setItems(breadcrumbItems);
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