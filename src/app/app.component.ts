import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { ThemeableComponent } from './common/theamable.component';
import { BaseProductService } from './services/base-product.service';
import { ThemingService } from './services/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ThemeableComponent{
  title = 'eshop';

  constructor(public service: BaseProductService,
    protected override themingService: ThemingService) {
    super(themingService);
  }
}
