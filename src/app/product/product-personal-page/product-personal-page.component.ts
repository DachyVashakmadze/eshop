import { Component, HostBinding, OnInit } from '@angular/core';
import { BaseProductService } from '../../services/base-product.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Product } from '../products.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';    
import { ThemingService } from 'src/app/services/theming.service';

@Component({
  selector: 'app-product-personal-page',
  templateUrl: './product-personal-page.component.html',
  styleUrls: ['./product-personal-page.component.scss']
})
export class ProductPersonalPageComponent implements OnInit {
  panelOpenState = false;
  element!: Product;
  @HostBinding('class') cssThemeClass!: string;
  constructor(
    private service: BaseProductService, 
    private responseive: BreakpointObserver, 
    private route: ActivatedRoute,
    private router: Router,
    private themingService: ThemingService
    ){
      this.themingService.theme.subscribe(them => this.cssThemeClass=them);
    }
  

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

  getGoogleSearchURL(value: string): string{
    return "https://www.google.com/search?q="+value;
  }
}
