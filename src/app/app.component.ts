import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { ThemeableComponent } from './common/theamable.component';
import { BaseProductService } from './services/base-product.service';
import { ThemingService } from './services/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ThemeableComponent implements OnInit {
  title = 'eshop';

  constructor(public service: BaseProductService,
    protected override themingService: ThemingService) {
    super(themingService);
  }

  ngOnInit(): void {
    // Todo remove: this code is just to demonstrate that service is working
    this.service.getProductList().subscribe(productList => console.log(productList));
    this.service.getProductById(2).subscribe(product => console.log(product));
  }
}
