import { Component, OnInit } from '@angular/core';
import { BaseProductService } from './services/base-product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eshop';

  constructor(public service: BaseProductService) {}

  ngOnInit(): void {
    // Todo remove: this code is just to demonstrate that service is working
    this.service.getProductList().subscribe(productList => console.log(productList));
    this.service.getProductById(2).subscribe(product => console.log(product));
  }
}
