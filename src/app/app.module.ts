import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductPersonalPageComponent } from './product-personal-page/product-personal-page.component';
import { BaseProductService } from './services/base-product.service';
import { TestProductService } from './services/test-product.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon'
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductPersonalPageComponent,
    ProductListComponent,
    ProductListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule
  ],
  providers: [
    {
      provide: BaseProductService,
      useClass: TestProductService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
