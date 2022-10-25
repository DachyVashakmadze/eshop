import { identifierName } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcumbService } from '../breadcrumb/breadcumb.service';
import { Product } from '../product/products.model';
import { BaseProductService } from '../services/base-product.service';

@Component({
  selector: 'app-product-personal-page',
  templateUrl: './product-personal-page.component.html',
  styleUrls: ['./product-personal-page.component.css']
})
export class ProductPersonalPageComponent implements OnInit, OnDestroy {
  product!: Product;
  routerSubscription!: Subscription;
  breadcrumbSubscription!: Subscription;
  productSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private service: BaseProductService,
    private breadcrumbService: BreadcumbService
  ) { }

  ngOnInit(): void {
    this.routerSubscription = this.route.params.subscribe(params => {

      this.productSubscription = this.service.getProductById(params['id']).subscribe(product => {
        if (product === null) {
          return;
        }

        this.product = product;

        this.breadcrumbService.setItems([
          {
            title: 'Products',
            url: 'products'
          },
          {
            title: this.product.title,
            url: `product/${this.product.id}`
          }
        ]);
      });
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }

}
