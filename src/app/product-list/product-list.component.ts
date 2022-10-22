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

  constructor(private service: BaseProductService) { }

  ngOnInit(): void {
    this.service.getProductList().subscribe(products => this.products = products);
  }

}
