import { Component, OnInit } from '@angular/core';
import { BaseProductService } from '../services/base-product.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Product } from '../products.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs';
    

@Component({
  selector: 'app-product-personal-page',
  templateUrl: './product-personal-page.component.html',
  styleUrls: ['./product-personal-page.component.css']
})
export class ProductPersonalPageComponent implements OnInit {
panelOpenState = false;
  element!: Product;
  constructor(
    private service: BaseProductService, 
    private responseive: BreakpointObserver, 
    private route: ActivatedRoute,
    private router: Router
    ){}
  

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const id= params["id"]
      this.service.getProductById(id).subscribe(p=> { 
        if(!p) {
          this.router.navigate(["urlNotFound"], {skipLocationChange:true})
        }else{
          this.element=p
        }
      });
    })
  }
}
