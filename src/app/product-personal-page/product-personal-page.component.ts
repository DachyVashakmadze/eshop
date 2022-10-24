import { Component, OnInit } from '@angular/core';
import { BaseProductService } from '../services/base-product.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
    

@Component({
  selector: 'app-product-personal-page',
  templateUrl: './product-personal-page.component.html',
  styleUrls: ['./product-personal-page.component.css']
})
export class ProductPersonalPageComponent implements OnInit {
  // element ={
  //   id: 1,
  //   title: "Samsung Galaxy S12",
  //   image: "https://m.media-amazon.com/images/I/71wGLBDEsvL._SX679_.jpg",
  //   price: 1300
  // }
  element =this.service.getProductById(1);
  displayedColumns: string[] = ['id', 'title', 'price'];
  constructor(private service: BaseProductService, private responseive: BreakpointObserver) { }
  

  ngOnInit(): void {
    // if( (this.element=this.service.getProductById(1))!=null )this.element=this.service.getProductById(1);
    // this.service.getProductList().subscribe(products => this.products = products);
  }

}
